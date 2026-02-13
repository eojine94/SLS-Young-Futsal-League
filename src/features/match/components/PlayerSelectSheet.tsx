import { useState } from 'react';
import { X, Minus, Plus, Circle, CircleCheck } from 'lucide-react';

type Player = {
  id: string;
  name: string;
  number: number;
};

type SelectedPlayer = {
  playerId: string;
  goals: number;
  assists: number;
};

type PlayerSelectSheetProps = {
  open: boolean;
  teamName: string;
  players: Player[];
  existingRecordPlayerIds: string[];
  onClose: () => void;
  onConfirm: (selections: SelectedPlayer[]) => void;
};

export function PlayerSelectSheet({
  open,
  teamName,
  players,
  existingRecordPlayerIds,
  onClose,
  onConfirm,
}: PlayerSelectSheetProps) {
  const [selections, setSelections] = useState<Map<string, { goals: number; assists: number }>>(
    new Map(),
  );

  const availablePlayers = players.filter((p) => !existingRecordPlayerIds.includes(p.id));

  const togglePlayer = (playerId: string) => {
    setSelections((prev) => {
      const next = new Map(prev);
      if (next.has(playerId)) {
        next.delete(playerId);
      } else {
        next.set(playerId, { goals: 0, assists: 0 });
      }
      return next;
    });
  };

  const updateStat = (
    playerId: string,
    field: 'goals' | 'assists',
    delta: number,
  ) => {
    setSelections((prev) => {
      const next = new Map(prev);
      const current = next.get(playerId);
      if (!current) return prev;
      next.set(playerId, {
        ...current,
        [field]: Math.max(0, current[field] + delta),
      });
      return next;
    });
  };

  const handleConfirm = () => {
    const result: SelectedPlayer[] = [];
    selections.forEach((stats, playerId) => {
      result.push({ playerId, ...stats });
    });
    onConfirm(result);
    setSelections(new Map());
  };

  const handleClose = () => {
    setSelections(new Map());
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      {/* Bottom Sheet */}
      <div className="relative flex max-h-[60dvh] flex-col overflow-hidden rounded-t-3xl bg-white">
        {/* Header */}
        <div className="flex flex-col gap-1 px-6 pb-5 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">선수 선택</h3>
            <button onClick={handleClose} className="cursor-pointer text-zinc-400">
              <X className="size-6" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            {teamName}에서 기록할 선수를 선택하세요.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Player List */}
        <div className="flex-1 overflow-y-auto">
          {availablePlayers.map((player, index) => {
            const isSelected = selections.has(player.id);
            const stats = selections.get(player.id);
            const isLast = index === availablePlayers.length - 1;

            return (
              <div
                key={player.id}
                className={`flex flex-col ${!isLast ? 'border-b border-border' : ''} ${isSelected ? 'bg-muted' : ''}`}
              >
                {/* Player Row */}
                <button
                  onClick={() => togglePlayer(player.id)}
                  className="flex cursor-pointer items-center justify-between px-6 py-4"
                >
                  <span
                    className={`text-sm ${isSelected ? 'font-semibold' : 'font-medium'} text-foreground`}
                  >
                    {player.number}. {player.name}
                  </span>
                  {isSelected ? (
                    <CircleCheck className="size-5.5 text-primary" />
                  ) : (
                    <Circle className="size-5.5 text-border" />
                  )}
                </button>

                {/* Expanded Stats (when selected) */}
                {isSelected && stats && (
                  <div className="flex gap-4 px-6 pb-4">
                    {/* Goal Stepper */}
                    <div className="flex flex-1 flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">골</span>
                      <div className="flex h-9 items-center overflow-hidden rounded-lg border border-border bg-white">
                        <button
                          onClick={() => updateStat(player.id, 'goals', -1)}
                          className="flex h-full w-9 cursor-pointer items-center justify-center text-zinc-400"
                        >
                          <Minus className="size-4" />
                        </button>
                        <div className="flex h-full flex-1 items-center justify-center">
                          <span className="text-sm font-semibold text-foreground">
                            {stats.goals}
                          </span>
                        </div>
                        <button
                          onClick={() => updateStat(player.id, 'goals', 1)}
                          className="flex h-full w-9 cursor-pointer items-center justify-center text-primary"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>

                    {/* Assist Stepper */}
                    <div className="flex flex-1 flex-col gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">도움</span>
                      <div className="flex h-9 items-center overflow-hidden rounded-lg border border-border bg-white">
                        <button
                          onClick={() => updateStat(player.id, 'assists', -1)}
                          className="flex h-full w-9 cursor-pointer items-center justify-center text-zinc-400"
                        >
                          <Minus className="size-4" />
                        </button>
                        <div className="flex h-full flex-1 items-center justify-center">
                          <span className="text-sm font-semibold text-foreground">
                            {stats.assists}
                          </span>
                        </div>
                        <button
                          onClick={() => updateStat(player.id, 'assists', 1)}
                          className="flex h-full w-9 cursor-pointer items-center justify-center text-primary"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirm Button */}
        <div className="px-5 pb-5 pt-4">
          <button
            onClick={handleConfirm}
            className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}
