import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateTeam } from './hooks/useTeams';

export default function TeamCreatePage() {
  const navigate = useNavigate();
  const createTeam = useCreateTeam();
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('팀명을 입력하세요.');
      return;
    }
    try {
      await createTeam.mutateAsync(name.trim());
      toast.success('팀이 생성되었습니다.');
      navigate('/team');
    } catch {
      toast.error('팀 생성에 실패했습니다.');
    }
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">팀 생성</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">새 팀 등록</h2>
          <p className="text-[13px] text-muted-foreground">
            팀명을 입력하여 새로운 팀을 등록하세요.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-foreground">팀명</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="팀명을 입력하세요"
            className="h-12 rounded-xl border-[1.5px] border-border px-4 text-[15px] text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={createTeam.isPending}
          className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createTeam.isPending ? '생성 중...' : '팀 생성'}
        </button>
      </div>
    </>
  );
}
