import type { Match, MatchGroup } from './types';

export const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    homeTeamId: '1',
    awayTeamId: '3',
    homeTeam: 'FC Thunder',
    awayTeam: 'FC Lightning',
    date: '2025.01.25(토)',
    time: '14:00',
    location: '마포풋살장',
    homeScore: 3,
    awayScore: 1,
    hasResult: true,
  },
  {
    id: '2',
    homeTeamId: '2',
    awayTeamId: '4',
    homeTeam: 'FC Storm',
    awayTeam: 'FC Wave',
    date: '2025.02.01(토)',
    time: '15:00',
    location: 'B구장',
    homeScore: 2,
    awayScore: 2,
    hasResult: true,
  },
  {
    id: '3',
    homeTeamId: '5',
    awayTeamId: '6',
    homeTeam: 'FC Blaze',
    awayTeam: 'FC Dynamo',
    date: '2025.02.01(토)',
    time: '16:00',
    location: 'C구장',
    homeScore: 4,
    awayScore: 2,
    hasResult: true,
  },
  {
    id: '4',
    homeTeamId: '1',
    awayTeamId: '2',
    homeTeam: 'FC Thunder',
    awayTeam: 'FC Storm',
    date: '2025.02.08(토)',
    time: '14:00',
    location: 'A구장',
    hasResult: false,
  },
  {
    id: '5',
    homeTeamId: '3',
    awayTeamId: '4',
    homeTeam: 'FC Lightning',
    awayTeam: 'FC Wave',
    date: '2025.02.08(토)',
    time: '16:00',
    location: 'B구장',
    hasResult: false,
  },
  {
    id: '6',
    homeTeamId: '1',
    awayTeamId: '3',
    homeTeam: 'FC Thunder',
    awayTeam: 'FC Lightning',
    date: '2025.02.22(토)',
    time: '14:00',
    location: '마포풋살장',
    hasResult: false,
  },
  {
    id: '7',
    homeTeamId: '2',
    awayTeamId: '4',
    homeTeam: 'FC Storm',
    awayTeam: 'FC Wave',
    date: '2025.03.01(토)',
    time: '15:00',
    location: 'C구장',
    hasResult: false,
  },
];

export function groupMatchesByDate(matches: Match[]): MatchGroup[] {
  const groupMap = new Map<string, Match[]>();

  for (const match of matches) {
    const group = groupMap.get(match.date);
    if (group) {
      group.push(match);
    } else {
      groupMap.set(match.date, [match]);
    }
  }

  return Array.from(groupMap.entries()).map(([date, matches]) => ({
    date,
    matches,
  }));
}
