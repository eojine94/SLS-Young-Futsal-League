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
import { MOCK_PLAYERS } from './mocks';

export default function PlayerEditPage() {
  const { teamId, playerId } = useParams<{ teamId: string; playerId: string }>();
  const navigate = useNavigate();

  const player = MOCK_PLAYERS.find((p) => p.id === playerId);

  const [name, setName] = useState(player?.name ?? '');
  const [number, setNumber] = useState(String(player?.number ?? 0));
  const [role, setRole] = useState<'leader' | 'member'>(player?.role ?? 'member');

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error('이름을 입력하세요.');
      return;
    }
    // TODO: Phase 4에서 Supabase 연동
    toast.success('선수 정보가 수정되었습니다.');
    navigate(`/team/${teamId}`);
  };

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
          <p className="text-[13px] text-muted-foreground">수정할 정보를 입력한 후 저장하세요.</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
              className="h-12 rounded-xl border-[1.5px] border-border px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
            />
          </div>

          {/* Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">등번호</label>
            <input
              type="number"
              min="0"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="h-12 rounded-xl border-[1.5px] border-border px-4 text-[15px] text-foreground outline-none focus:border-primary"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-foreground">역할</label>
            <Select value={role} onValueChange={(v) => setRole(v as 'leader' | 'member')}>
              <SelectTrigger className="h-12 w-full rounded-xl border-[1.5px] border-border bg-white px-4 text-[15px] text-foreground shadow-none focus:border-primary focus:ring-0">
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
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
        >
          선수 수정
        </button>
      </div>
    </>
  );
}
