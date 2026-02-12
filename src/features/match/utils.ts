import type { Match, MatchGroup } from './types';

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
