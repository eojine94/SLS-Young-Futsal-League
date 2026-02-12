import { SectionTitle } from '@shared/components/SectionTitle';
import { DateHeader } from '@shared/components/DateHeader';
import { MatchCard } from '@shared/components/MatchCard';

type MatchSchedule = {
  id: string;
  teams: string;
  time: string;
  location: string;
};

const MOCK_DATE = '2025.02.15(토)';

const MOCK_MATCHES: MatchSchedule[] = [
  { id: '1', teams: 'FC Thunder vs FC Storm', time: '14:00', location: 'A구장' },
  { id: '2', teams: 'FC Lightning vs FC Wave', time: '16:00', location: 'B구장' },
  { id: '3', teams: 'FC Blaze vs FC Dynamo', time: '13:00', location: 'C구장' },
  { id: '4', teams: 'FC United vs FC Thunder', time: '15:00', location: 'D구장' },
  { id: '5', teams: 'FC Storm vs FC Wave', time: '17:00', location: 'A구장' },
  { id: '6', teams: 'FC Lightning vs FC Blaze', time: '18:00', location: '마포풋살장' },
];

export function ScheduleSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionTitle title="다음 경기" />
      <DateHeader date={MOCK_DATE} />
      <div className="flex flex-col gap-3">
        {MOCK_MATCHES.map((match) => (
          <MatchCard
            key={match.id}
            teams={match.teams}
            time={match.time}
            location={match.location}
          />
        ))}
      </div>
    </section>
  );
}
