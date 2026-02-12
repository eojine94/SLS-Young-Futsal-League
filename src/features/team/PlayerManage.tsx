import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Settings, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@shared/components/DeleteConfirmDialog';
import { MOCK_TEAMS, MOCK_PLAYERS } from './mocks';

export default function PlayerManagePage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const team = MOCK_TEAMS.find((t) => t.id === teamId);
  const players = MOCK_PLAYERS.filter((p) => p.teamId === teamId);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    // TODO: Phase 4에서 Supabase 연동
    toast.success('선수가 삭제되었습니다.');
    setDeleteTargetId(null);
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/team')}
            className="-ml-1 cursor-pointer p-1 text-foreground"
          >
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="text-xl font-semibold text-foreground">{team?.name ?? '팀 상세'}</h1>
        </div>
        <button
          onClick={() => navigate(`/team/${teamId}/edit`)}
          className="cursor-pointer p-1 text-muted-foreground"
        >
          <Settings className="size-6" />
        </button>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-4 px-5 py-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">선수 목록</h2>
          <button
            onClick={() => navigate(`/team/${teamId}/players/create`)}
            className="flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white"
          >
            선수 추가
          </button>
        </div>

        {/* Player List */}
        <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
          {players.length === 0 ? (
            <div className="flex h-20 items-center justify-center">
              <span className="text-sm text-muted-foreground">등록된 선수가 없습니다.</span>
            </div>
          ) : (
            players.map((player) => (
              <div
                key={player.id}
                className="flex h-14 items-center justify-between border-b border-border px-4 last:border-b-0"
              >
                {/* Left: Name + Badge */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[15px] font-medium text-foreground">
                    {player.number}. {player.name}
                  </span>
                  {player.role === 'leader' && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      팀장
                    </span>
                  )}
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate(`/team/${teamId}/players/${player.id}/edit`)}
                    className="cursor-pointer p-0.5 text-muted-foreground/60"
                  >
                    <Pencil className="size-[18px]" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(player.id)}
                    className="cursor-pointer p-0.5 text-muted-foreground/60"
                  >
                    <Trash2 className="size-[18px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
