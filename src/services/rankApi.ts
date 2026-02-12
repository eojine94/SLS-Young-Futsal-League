import { supabase } from './supabase';

export type TeamRankingRow = {
  id: string;
  name: string;
  matches: number;
  wins: number;
  draws: number;
  losses: number;
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
