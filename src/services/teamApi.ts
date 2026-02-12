import { supabase } from './supabase';

type TeamWithCount = {
  id: string;
  name: string;
  playerCount: number;
};

export const teamApi = {
  async getAll(): Promise<TeamWithCount[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name, players(count)')
      .order('name');
    if (error) throw error;
    const rows = data as { id: string; name: string; players: { count: number }[] }[];
    return rows.map((t) => ({
      id: t.id,
      name: t.name,
      playerCount: t.players[0]?.count ?? 0,
    }));
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as { id: string; name: string; created_at: string };
  },

  async create(name: string) {
    const { data, error } = await supabase
      .from('teams')
      .insert({ name })
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, name: string) {
    const { error } = await supabase
      .from('teams')
      .update({ name })
      .eq('id', id);
    if (error) throw error;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
