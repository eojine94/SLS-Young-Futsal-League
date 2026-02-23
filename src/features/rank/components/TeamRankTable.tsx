import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useTeamRankingsEnriched } from '../hooks/useRankings';

function TeamRankTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto no-scrollbar">
        {/* Header */}
        <div className="flex h-12.5 min-w-max items-center bg-muted">
          <div className="sticky left-0 z-10 flex w-50 shrink-0 items-center bg-muted px-4">
            <span className="text-xs font-semibold text-muted-foreground">순위</span>
          </div>
          <div className="ml-auto flex pr-3">
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">승점</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">경기</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">승</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">무</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">패</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">득실</span>
            </div>
          </div>
        </div>

        {/* Skeleton Rows */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex h-12.5 min-w-max items-center border-b border-border last:border-b-0"
          >
            <div className="sticky left-0 z-10 flex w-50 shrink-0 items-center gap-3 bg-white px-4">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="ml-auto flex pr-3">
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <Skeleton className="h-4 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamRankTable() {
  const navigate = useNavigate();
  const { data: teams, isLoading, error } = useTeamRankingsEnriched();

  const sortedTeams = useMemo(() => {
    if (!teams) return [];
    return [...teams].sort((a, b) => {
      if (a.points !== b.points) return b.points - a.points;
      if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
      return a.name.localeCompare(b.name, 'ko');
    });
  }, [teams]);

  if (isLoading) return <TeamRankTableSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="overflow-x-auto no-scrollbar">
        {/* Header Row */}
        <div className="flex h-12.5 min-w-max items-center bg-muted">
          <div className="sticky left-0 z-10 flex w-50 shrink-0 items-center bg-muted px-4">
            <span className="text-xs font-semibold text-muted-foreground">순위</span>
          </div>
          <div className="ml-auto flex pr-3">
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-primary">승점</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">경기</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">승</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">무</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">패</span>
            </div>
            <div className="flex w-10 shrink-0 items-center justify-center">
              <span className="text-xs font-semibold text-muted-foreground">득실</span>
            </div>
          </div>
        </div>

        {/* Data Rows */}
        {sortedTeams.map((team, index) => (
          <div
            key={team.id}
            className="group flex h-12.5 min-w-max w-full items-center border-b border-border last:border-b-0"
          >
            <div className="sticky left-0 z-10 flex w-50 shrink-0 items-center gap-3 bg-white px-4">
              <span className="text-sm font-semibold text-primary">{index + 1}</span>
              <button
                className="cursor-pointer truncate text-sm font-medium text-foreground"
                onClick={() => navigate(`/rank/${team.id}`)}
              >
                {team.name}
              </button>
            </div>
            <div className="ml-auto flex pr-3">
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm font-semibold text-primary">{team.points}</span>
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm text-foreground">{team.matches}</span>
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm text-foreground">{team.wins}</span>
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm text-foreground">{team.draws}</span>
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm text-foreground">{team.losses}</span>
              </div>
              <div className="flex w-10 shrink-0 items-center justify-center">
                <span className="text-sm text-foreground">
                  {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
