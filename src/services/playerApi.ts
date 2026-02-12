import { supabase } from './supabase';

export type PlayerRow = {
  id: string;
  name: string;
  number: number;
  team_id: string;
  role: string;
  created_at: string;
};

export const playerApi = {
  async getByTeamId(teamId: string): Promise<PlayerRow[]> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .order('number');
    if (error) throw error;
    return data as PlayerRow[];
  },

  async getById(id: string): Promise<PlayerRow> {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as PlayerRow;
  },

  async createMany(players: { name: string; number: number; team_id: string; role: string }[]) {
    const { data, error } = await supabase
      .from('players')
      .insert(players)
      .select();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: { name?: string; number?: number; role?: string }) {
    const { error } = await supabase
      .from('players')
      .update(updates)
      .eq('id', id);
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
