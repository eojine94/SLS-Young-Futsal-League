import { supabase } from './supabase';

export type MatchWithTeams = {
  id: string;
  team_a_id: string;
  team_b_id: string;
  match_date: string;
  match_time: string;
  location: string;
  team_a_score: number | null;
  team_b_score: number | null;
  created_at: string;
  team_a: { name: string };
  team_b: { name: string };
};

export const matchApi = {
  async getAll(): Promise<MatchWithTeams[]> {
    const { data, error } = await supabase
      .from('matches')
      .select('*, team_a:teams!team_a_id(name), team_b:teams!team_b_id(name)')
      .order('match_date')
      .order('match_time');
    if (error) throw error;
    return data as MatchWithTeams[];
  },

  async getById(id: string): Promise<MatchWithTeams> {
    const { data, error } = await supabase
      .from('matches')
      .select('*, team_a:teams!team_a_id(name), team_b:teams!team_b_id(name)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as MatchWithTeams;
  },

  async create(match: {
    team_a_id: string;
    team_b_id: string;
    match_date: string;
    match_time: string;
    location: string;
  }) {
    const { data, error } = await supabase
      .from('matches')
      .insert(match)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(
    id: string,
    updates: {
      team_a_id?: string;
      team_b_id?: string;
      match_date?: string;
      match_time?: string;
      location?: string;
      team_a_score?: number | null;
      team_b_score?: number | null;
    },
  ) {
    const { error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
