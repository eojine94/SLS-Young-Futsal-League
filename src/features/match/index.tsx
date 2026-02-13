import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@shared/components/Header';
import { useAuth } from '@shared/hooks/useAuth';
import { MatchList } from './components/MatchList';

export default function MatchPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  return (
    <>
      <PageHeader />
      <div className="flex flex-col gap-2 px-5 py-6">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-xl font-semibold text-foreground">경기</h2>
          {isAdmin && (
            <button
              className="flex h-11 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white"
              onClick={() => navigate('/match/schedule/new')}
            >
              경기 등록
            </button>
          )}
        </div>
        <p className="whitespace-pre-line pb-2 text-xs leading-5 text-muted-foreground">
          {isAdmin
            ? '예정된 경기를 탭하면 일정을 수정하고,\n완료된 경기를 탭하면 결과를 등록할 수 있습니다.'
            : '모든 경기 일정과 결과를 확인할 수 있습니다.'}
        </p>
        <MatchList isAdmin={isAdmin} />
      </div>
    </>
  );
}
