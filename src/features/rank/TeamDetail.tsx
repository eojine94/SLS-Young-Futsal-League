import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useTeams } from '@features/team/hooks/useTeams';
import { usePlayerRankingsByTeam } from './hooks/useRankings';

export default function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const { data: teams } = useTeams();
  const { data: players, isLoading, error } = usePlayerRankingsByTeam(teamId!);

  const team = teams?.find((t) => t.id === teamId);

  const sortedPlayers = useMemo(() => {
    if (!players) return [];
    return [...players].sort((a, b) => {
      if (a.goals !== b.goals) return b.goals - a.goals;
      return a.name.localeCompare(b.name, 'ko');
    });
  }, [players]);

  return (
    <>
      {/* Back Header */}
      <header className="flex h-14 items-center gap-3 bg-white px-5">
        <button
          onClick={() => navigate('/rank')}
          className="-ml-1 cursor-pointer p-1 text-foreground"
        >
          <ChevronLeft className="size-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">{team?.name ?? '팀 상세'}</h1>
      </header>

      {/* Content */}
      <div className="px-5 py-6">
        {/* Guide Text */}
        <div className="flex flex-col gap-1 pb-2">
          <h2 className="text-base font-semibold text-foreground">팀 내 선수 순위</h2>
          <p className="text-xs text-muted-foreground">골 수 기준으로 정렬됩니다.</p>
        </div>

        {isLoading ? (
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-11 items-center bg-muted">
              <div className="flex w-11 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">순위</span>
              </div>
              <div className="flex min-w-0 flex-1 items-center px-3">
                <span className="text-xs font-semibold text-muted-foreground">이름</span>
              </div>
              <div className="flex w-14 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">골</span>
              </div>
              <div className="flex w-14 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">도움</span>
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex h-11 items-center border-b border-border last:border-b-0"
              >
                <div className="flex w-11 shrink-0 items-center justify-center">
                  <Skeleton className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-1 items-center px-3">
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <Skeleton className="h-4 w-4" />
                </div>
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <Skeleton className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <ErrorMessage />
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            {/* Header Row */}
            <div className="flex h-11 items-center bg-muted">
              <div className="flex w-11 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">순위</span>
              </div>
              <div className="flex min-w-0 flex-1 items-center px-3">
                <span className="text-xs font-semibold text-muted-foreground">이름</span>
              </div>
              <div className="flex w-14 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">골</span>
              </div>
              <div className="flex w-14 shrink-0 items-center justify-center">
                <span className="text-xs font-semibold text-muted-foreground">도움</span>
              </div>
            </div>

            {/* Data Rows */}
            {sortedPlayers.map((player, index) => (
              <div
                key={player.id}
                className="flex h-11 items-center border-b border-border last:border-b-0"
              >
                <div className="flex w-11 shrink-0 items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{index + 1}</span>
                </div>
                <div className="flex min-w-0 flex-1 items-center px-3">
                  <span className="truncate text-sm font-medium text-foreground">
                    {player.number}. {player.name}
                  </span>
                </div>
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{player.goals}</span>
                </div>
                <div className="flex w-14 shrink-0 items-center justify-center">
                  <span className="text-sm text-foreground">{player.assists}</span>
                </div>
              </div>
            ))}

            {sortedPlayers.length === 0 && (
              <div className="flex h-20 items-center justify-center">
                <span className="text-sm text-muted-foreground">등록된 선수가 없습니다.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
