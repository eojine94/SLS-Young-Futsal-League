import { useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateHeader } from '@shared/components/DateHeader';
import { MatchCard } from '@shared/components/MatchCard';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import type { Match, MatchGroup } from '../types';
import { useMatches } from '../hooks/useMatches';
import { groupMatchesByDate } from '../utils';
import { isDatePast } from '@shared/utils/dateFormat';

function isPastMatch(match: Match): boolean {
  return isDatePast(match.rawDate);
}

function formatScore(match: Match): string | undefined {
  if (match.hasResult && match.homeScore !== undefined && match.awayScore !== undefined) {
    return `${match.homeScore} : ${match.awayScore}`;
  }
  return undefined;
}

function getTag(match: Match): string | undefined {
  if (!match.hasResult && isPastMatch(match)) {
    return '결과 등록 필요';
  }
  return undefined;
}

function getOnClick(
  match: Match,
  navigate: (path: string) => void,
  isAdmin: boolean,
): (() => void) | undefined {
  if (!isAdmin) return undefined;

  if (match.hasResult || isPastMatch(match)) {
    return () => navigate(`/match/${match.id}/result`);
  }
  return () => navigate(`/match/${match.id}/schedule/edit`);
}

function findFirstFutureDateIndex(groups: MatchGroup[]): number {
  return groups.findIndex((group) =>
    group.matches.some((match) => !isPastMatch(match)),
  );
}

type MatchListProps = {
  isAdmin: boolean;
};

export function MatchList({ isAdmin }: MatchListProps) {
  const navigate = useNavigate();
  const futureRef = useRef<HTMLDivElement>(null);
  const { data: matches, isLoading, error } = useMatches();

  const matchGroups: MatchGroup[] = useMemo(
    () => (matches ? groupMatchesByDate(matches) : []),
    [matches],
  );

  const firstFutureIndex = useMemo(
    () => findFirstFutureDateIndex(matchGroups),
    [matchGroups],
  );

  useEffect(() => {
    if (futureRef.current) {
      futureRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [matchGroups]);

  if (isLoading)
    return (
      <div className="flex flex-col gap-7">
        {Array.from({ length: 3 }).map((_, gi) => (
          <div key={gi} className="flex flex-col gap-3">
            <div className="flex h-9 items-center gap-3 px-1">
              <div className="h-px flex-1 bg-border" />
              <Skeleton className="h-3.5 w-28" />
              <div className="h-px flex-1 bg-border" />
            </div>
            {Array.from({ length: 2 }).map((_, ci) => (
              <div
                key={ci}
                className="flex items-center gap-4 rounded-2xl border-[1.5px] border-border p-4"
              >
                <Skeleton className="h-10 w-0.75 shrink-0 rounded-sm" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3.5 w-28" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  if (error) return <ErrorMessage />;

  return (
    <div className="flex flex-col gap-7">
      {matchGroups.map((group, index) => (
        <div
          key={group.date}
          ref={index === firstFutureIndex ? futureRef : undefined}
          className="flex flex-col gap-3"
        >
          <DateHeader date={group.date} />
          {group.matches.map((match) => (
            <MatchCard
              key={match.id}
              teams={`${match.homeTeam} vs ${match.awayTeam}`}
              time={match.time}
              location={match.location}
              score={formatScore(match)}
              tag={isAdmin ? getTag(match) : undefined}
              onClick={getOnClick(match, navigate, isAdmin)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
