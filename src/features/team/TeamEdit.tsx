import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { DeleteConfirmDialog } from '@shared/components/DeleteConfirmDialog';
import { LoadingSpinner } from '@shared/components/LoadingSpinner';
import { useTeams, useUpdateTeam, useDeleteTeam } from './hooks/useTeams';

export default function TeamEditPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const { data: teams, isLoading: teamsLoading } = useTeams();
  const updateTeam = useUpdateTeam();
  const deleteTeam = useDeleteTeam();

  const team = teams?.find((t) => t.id === teamId);

  const [name, setName] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // 팀 데이터 로드 후 이름 초기화
  if (team && !initialized) {
    setName(team.name);
    setInitialized(true);
  }

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('팀명을 입력하세요.');
      return;
    }
    try {
      await updateTeam.mutateAsync({ id: teamId!, name: name.trim() });
      toast.success('팀 정보가 수정되었습니다.');
      navigate(`/team/${teamId}`);
    } catch {
      toast.error('팀 수정에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTeam.mutateAsync(teamId!);
      toast.success('팀이 삭제되었습니다.');
      navigate('/team');
    } catch {
      toast.error('팀 삭제에 실패했습니다.');
    }
    setShowDeleteDialog(false);
  };

  if (teamsLoading) return <LoadingSpinner />;

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
          <p className="text-xs text-muted-foreground">
            팀명을 수정하거나 팀을 삭제할 수 있습니다.
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="team-name" className="text-xs font-medium text-foreground">팀명</label>
          <input
            id="team-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="팀명을 입력하세요"
            className="h-12 rounded-xl border border-border px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            disabled={updateTeam.isPending}
            className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updateTeam.isPending ? '저장 중...' : '저장'}
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
        description="팀을 삭제하면 소속 선수, 관련 경기 및 모든 기록이 함께 삭제됩니다."
        isPending={deleteTeam.isPending}
      />
    </>
  );
}
