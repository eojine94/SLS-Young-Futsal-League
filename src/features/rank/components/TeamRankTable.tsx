import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useTeamRankings } from '../hooks/useRankings';

function TeamRankTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
      <div className="flex h-11 items-center bg-muted">
        <div className="flex w-10 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">순위</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center px-3">
          <span className="text-[13px] font-semibold text-muted-foreground">팀명</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">경기</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">승</span>
        </div>
        <div className="flex w-10 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">무</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">패</span>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex h-11 items-center border-b border-border last:border-b-0"
        >
          <div className="flex w-10 shrink-0 items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex min-w-0 flex-1 items-center px-3">
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex w-10 shrink-0 items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TeamRankTable() {
  const navigate = useNavigate();
  const { data: teams, isLoading, error } = useTeamRankings();

  const sortedTeams = useMemo(() => {
    if (!teams) return [];
    return [...teams].sort((a, b) => {
      if (a.wins !== b.wins) return b.wins - a.wins;
      return a.name.localeCompare(b.name, 'ko');
    });
  }, [teams]);

  if (isLoading) return <TeamRankTableSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div className="overflow-hidden rounded-xl border-[1.5px] border-border">
      {/* Header Row */}
      <div className="flex h-11 items-center bg-muted">
        <div className="flex w-10 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">순위</span>
        </div>
        <div className="flex min-w-0 flex-1 items-center px-3">
          <span className="text-[13px] font-semibold text-muted-foreground">팀명</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">경기</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">승</span>
        </div>
        <div className="flex w-10 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">무</span>
        </div>
        <div className="flex w-12 shrink-0 items-center justify-center">
          <span className="text-[13px] font-semibold text-muted-foreground">패</span>
        </div>
      </div>

      {/* Data Rows */}
      {sortedTeams.map((team, index) => (
        <button
          key={team.id}
          className="flex h-11 w-full cursor-pointer items-center border-b border-border transition-colors last:border-b-0 hover:bg-muted/50"
          onClick={() => navigate(`/rank/${team.id}`)}
        >
          <div className="flex w-10 shrink-0 items-center justify-center">
            <span className="text-sm font-semibold text-primary">{index + 1}</span>
          </div>
          <div className="flex min-w-0 flex-1 items-center px-3">
            <span className="truncate text-sm font-medium text-foreground">{team.name}</span>
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <span className="text-sm text-foreground">{team.matches}</span>
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <span className="text-sm font-semibold text-primary">{team.wins}</span>
          </div>
          <div className="flex w-10 shrink-0 items-center justify-center">
            <span className="text-sm text-foreground">{team.draws}</span>
          </div>
          <div className="flex w-12 shrink-0 items-center justify-center">
            <span className="text-sm text-foreground">{team.losses}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
