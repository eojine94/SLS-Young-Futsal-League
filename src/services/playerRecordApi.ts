import { supabase } from './supabase';

export type PlayerRecordWithPlayer = {
  id: string;
  match_id: string;
  player_id: string;
  goals: number;
  assists: number;
  created_at: string;
  player: { name: string; number: number; team_id: string };
};

export const playerRecordApi = {
  async getByMatchId(matchId: string): Promise<PlayerRecordWithPlayer[]> {
    const { data, error } = await supabase
      .from('player_records')
      .select('*, player:players(name, number, team_id)')
      .eq('match_id', matchId);
    if (error) throw error;
    return data as PlayerRecordWithPlayer[];
  },

  async upsertMany(records: { match_id: string; player_id: string; goals: number; assists: number }[]) {
    const { error } = await supabase
      .from('player_records')
      .upsert(records, { onConflict: 'match_id,player_id' });
    if (error) throw error;
  },

  async deleteByMatchId(matchId: string) {
    const { error } = await supabase
      .from('player_records')
      .delete()
      .eq('match_id', matchId);
    if (error) throw error;
  },
};
