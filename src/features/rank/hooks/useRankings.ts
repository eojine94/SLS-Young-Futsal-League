import { useQuery } from '@tanstack/react-query';
import { rankApi } from '@services/rankApi';
import type { TeamRank, PlayerRank } from '../types';

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
