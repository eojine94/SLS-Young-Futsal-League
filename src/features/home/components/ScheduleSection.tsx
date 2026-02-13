import { useMemo } from 'react';
import { SectionTitle } from '@shared/components/SectionTitle';
import { DateHeader } from '@shared/components/DateHeader';
import { MatchCard } from '@shared/components/MatchCard';
import { Skeleton } from '@shared/components/Skeleton';
import { ErrorMessage } from '@shared/components/ErrorMessage';
import { useMatches } from '@features/match/hooks/useMatches';
import { isDatePast } from '@shared/utils/dateFormat';

function ScheduleSkeleton() {
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="다음 경기" />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl border border-border p-4"
          >
            <Skeleton className="h-10 w-0.75 shrink-0 rounded-sm" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3.5 w-28" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ScheduleSection() {
  const { data: matches, isLoading, error } = useMatches();

  const nextDateMatches = useMemo(() => {
    if (!matches) return null;

    // Matches are sorted by date/time from API. Find first future match.
    const futureMatches = matches.filter((m) => !isDatePast(m.rawDate));
    if (futureMatches.length === 0) return null;

    // Take all matches on the nearest future date
    const firstDate = futureMatches[0].rawDate;
    return futureMatches.filter((m) => m.rawDate === firstDate);
  }, [matches]);

  if (isLoading) return <ScheduleSkeleton />;
  if (error) return <ErrorMessage />;
  if (!nextDateMatches || nextDateMatches.length === 0) return null;

  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="다음 경기" />
      <DateHeader date={nextDateMatches[0].date} />
      <div className="flex flex-col gap-3">
        {nextDateMatches.map((match) => (
          <MatchCard
            key={match.id}
            teams={`${match.homeTeam} vs ${match.awayTeam}`}
            time={match.time}
            location={match.location}
          />
        ))}
      </div>
    </section>
  );
}
