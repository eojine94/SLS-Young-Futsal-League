import { useMemo } from 'react';
import { SectionTitle } from '@shared/components/SectionTitle';
import { DateHeader } from '@shared/components/DateHeader';
import { MatchCard } from '@shared/components/MatchCard';
import { useMatches } from '@features/match/hooks/useMatches';
import { isDatePast } from '@shared/utils/dateFormat';

export function ScheduleSection() {
  const { data: matches } = useMatches();

  const nextDateMatches = useMemo(() => {
    if (!matches) return null;

    // Matches are sorted by date/time from API. Find first future match.
    const futureMatches = matches.filter((m) => !isDatePast(m.rawDate));
    if (futureMatches.length === 0) return null;

    // Take all matches on the nearest future date
    const firstDate = futureMatches[0].rawDate;
    return futureMatches.filter((m) => m.rawDate === firstDate);
  }, [matches]);

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
