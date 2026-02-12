import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@shared/components/DeleteConfirmDialog';
import { MOCK_TEAMS } from './mocks';
import { MOCK_PLAYERS } from './mocks';

export default function TeamEditPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const team = MOCK_TEAMS.find((t) => t.id === teamId);
  const playersInTeam = MOCK_PLAYERS.filter((p) => p.teamId === teamId);

  const [name, setName] = useState(team?.name ?? '');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      toast.error('팀명을 입력하세요.');
      return;
    }
    // TODO: Phase 4에서 Supabase 연동
    toast.success('팀 정보가 수정되었습니다.');
    navigate(`/team/${teamId}`);
  };

  const handleDelete = () => {
    if (playersInTeam.length > 0) {
      toast.error('소속 선수가 있는 팀은 삭제할 수 없습니다.');
      setShowDeleteDialog(false);
      return;
    }
    // TODO: Phase 4에서 Supabase 연동
    toast.success('팀이 삭제되었습니다.');
    navigate('/team');
  };

  return (
    <>
      {/* Header */}
      <header className="flex h-14 items-center gap-3 px-5">
        <button onClick={() => navigate(-1)} className="-ml-1 cursor-pointer p-1 text-foreground">
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">팀 수정</h1>
      </header>

      {/* Content */}
      <div className="flex flex-col gap-6 px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">팀 정보 수정</h2>
          <p className="text-[13px] text-muted-foreground">
            팀명을 수정하거나 팀을 삭제할 수 있습니다.
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

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white"
          >
            저장
          </button>
          <button
            onClick={() => setShowDeleteDialog(true)}
            className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-red-500 text-sm font-semibold text-white"
          >
            팀 삭제
          </button>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteConfirmDialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
