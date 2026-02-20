import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/components/ui/select';
import { LoadingSpinner } from '@shared/components/LoadingSpinner';
import { usePlayer, useUpdatePlayer } from './hooks/usePlayers';

export default function PlayerEditPage() {
  const { teamId, playerId } = useParams<{ teamId: string; playerId: string }>();
  const navigate = useNavigate();

  const { data: player, isLoading } = usePlayer(playerId!);
  const updatePlayer = useUpdatePlayer();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('0');
  const [role, setRole] = useState<'leader' | 'member'>('member');
  const [initialized, setInitialized] = useState(false);

  if (player && !initialized) {
    setName(player.name);
    setNumber(String(player.number));
    setRole(player.role);
    setInitialized(true);
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('이름을 입력하세요.');
      return;
    }
    try {
      await updatePlayer.mutateAsync({
        id: playerId!,
        updates: { name: name.trim(), number: Number(number), role },
      });
      toast.success('선수 정보가 수정되었습니다.');
      navigate(`/team/${teamId}`);
    } catch {
      toast.error('선수 수정에 실패했습니다.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">선수 수정</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">선수 정보 수정</h2>
          <p className="text-xs text-muted-foreground">수정할 정보를 입력한 후 저장하세요.</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="player-name" className="text-xs font-medium text-foreground">이름</label>
            <input
              id="player-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>

          {/* Number */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="player-number" className="text-xs font-medium text-foreground">등번호</label>
            <input
              id="player-number"
              type="number"
              min="0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none focus:border-primary"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-foreground">역할</label>
            <Select value={role} onValueChange={(v) => setRole(v as 'leader' | 'member')}>
              <SelectTrigger className="h-12 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-none focus:border-primary focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={4}>
                <SelectItem value="member">팀원</SelectItem>
                <SelectItem value="leader">팀장</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={updatePlayer.isPending}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {updatePlayer.isPending ? '수정 중...' : '선수 수정'}
        </button>
      </div>
    </>
  );
}
