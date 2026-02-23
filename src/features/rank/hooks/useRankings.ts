import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { rankApi } from '@services/rankApi';
import type { TeamRank, TeamRankEnriched, PlayerRank } from '../types';

export function useTeamRankings() {
  return useQuery({
    queryKey: ['rankings', 'teams'],
    queryFn: rankApi.getTeamRankings,
    select: (data): TeamRank[] => data.map((row) => ({
      id: row.id,
      name: row.name,
      matches: row.matches,
      wins: row.wins,
      draws: row.draws,
      losses: row.losses,
    })),
  });
}

export function useTeamRankingsEnriched() {
  const teamQuery = useTeamRankings();
  const matchScoresQuery = useQuery({
    queryKey: ['rankings', 'matchScores'],
    queryFn: rankApi.getMatchScores,
  });

  const data = useMemo((): TeamRankEnriched[] | undefined => {
    if (!teamQuery.data || !matchScoresQuery.data) return undefined;

    const goalStats = new Map<string, { goalsFor: number; goalsAgainst: number }>();

    for (const match of matchScoresQuery.data) {
      const aStats = goalStats.get(match.team_a_id) ?? { goalsFor: 0, goalsAgainst: 0 };
      aStats.goalsFor += match.team_a_score;
      aStats.goalsAgainst += match.team_b_score;
      goalStats.set(match.team_a_id, aStats);

      const bStats = goalStats.get(match.team_b_id) ?? { goalsFor: 0, goalsAgainst: 0 };
      bStats.goalsFor += match.team_b_score;
      bStats.goalsAgainst += match.team_a_score;
      goalStats.set(match.team_b_id, bStats);
    }

    return teamQuery.data.map((team) => {
      const stats = goalStats.get(team.id) ?? { goalsFor: 0, goalsAgainst: 0 };
      return {
        ...team,
        points: team.wins * 3 + team.draws,
        goalDifference: stats.goalsFor - stats.goalsAgainst,
      };
    });
  }, [teamQuery.data, matchScoresQuery.data]);

  return {
    data,
    isLoading: teamQuery.isLoading || matchScoresQuery.isLoading,
    error: teamQuery.error || matchScoresQuery.error,
  };
}

export function usePlayerRankings() {
  return useQuery({
    queryKey: ['rankings', 'players'],
    queryFn: rankApi.getPlayerRankings,
    select: (data): PlayerRank[] => data.map((row) => ({
      id: row.id,
      name: row.name,
      number: row.number,
      teamId: row.team_id,
      teamName: row.team_name,
      goals: row.goals,
      assists: row.assists,
    })),
  });
}

export function usePlayerRankingsByTeam(teamId: string) {
  return useQuery({
    queryKey: ['rankings', 'players', teamId],
    queryFn: () => rankApi.getPlayerRankingsByTeam(teamId),
    select: (data): PlayerRank[] => data.map((row) => ({
      id: row.id,
      name: row.name,
      number: row.number,
      teamId: row.team_id,
      teamName: row.team_name,
      goals: row.goals,
      assists: row.assists,
    })),
  });
}
