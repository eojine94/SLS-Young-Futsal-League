import { supabase } from './supabase';

export type TeamRankingRow = {
  id: string;
  name: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
};

export type MatchScoreRow = {
  team_a_id: string;
  team_b_id: string;
  team_a_score: number;
  team_b_score: number;
};

export type PlayerRankingRow = {
  id: string;
  name: string;
  number: number;
  team_id: string;
  team_name: string;
  goals: number;
  assists: number;
};

export const rankApi = {
  async getTeamRankings(): Promise<TeamRankingRow[]> {
    const { data, error } = await supabase
      .from('team_rankings')
      .select('*');
    if (error) throw error;
    return data as TeamRankingRow[];
  },

  async getMatchScores(): Promise<MatchScoreRow[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('team_a_id, team_b_id, team_a_score, team_b_score')
      .not('team_a_score', 'is', null);
    if (error) throw error;
    return data as MatchScoreRow[];
  },

  async getPlayerRankings(): Promise<PlayerRankingRow[]> {
    const { data, error } = await supabase
      .from('player_rankings')
      .select('*');
    if (error) throw error;
    return data as PlayerRankingRow[];
  },

  async getPlayerRankingsByTeam(teamId: string): Promise<PlayerRankingRow[]> {
    const { data, error } = await supabase
      .from('player_rankings')
      .select('*')
      .eq('team_id', teamId);
    if (error) throw error;
    return data as PlayerRankingRow[];
  },
};
