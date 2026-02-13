import { useNavigate } from 'react-router-dom';
import { Users, ChevronRight } from 'lucide-react';
import { PageHeader } from '@shared/components/Header';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useTeams } from './hooks/useTeams';

export default function TeamPage() {
  const navigate = useNavigate();
  const { data: teams, isLoading, error } = useTeams();

  return (
    <>
      <PageHeader />
      <div className="px-5 py-6">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">팀 관리</h2>
          <button
            onClick={() => navigate('/team/create')}
            className="flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-white"
          >
            팀 추가
          </button>
        </div>

        {/* Team List */}
        {isLoading ? (
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex h-16 items-center justify-between border-b border-border px-4 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="size-10 rounded-lg" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3.5 w-8" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            {teams?.map((team) => (
              <button
                key={team.id}
                onClick={() => navigate(`/team/${team.id}`)}
                className="flex h-16 w-full cursor-pointer items-center justify-between border-b border-border px-4 last:border-b-0"
              >
                {/* Left: Icon + Name */}
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="size-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{team.name}</span>
                </div>

                {/* Right: Count + Chevron */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{team.playerCount}명</span>
                  <ChevronRight className="size-5 text-muted-foreground/60" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
