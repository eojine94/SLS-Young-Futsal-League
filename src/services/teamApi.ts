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
    // 1. 이 팀 소속 선수 ID 조회
    const { data: players, error: playersQueryError } = await supabase
      .from('players')
      .select('id')
      .eq('team_id', id);
    if (playersQueryError) throw playersQueryError;
    const playerIds = (players ?? []).map((p) => p.id);

    // 2. 이 팀이 참여한 경기 ID 조회
    const { data: matches, error: matchesQueryError } = await supabase
      .from('matches')
      .select('id')
      .or(`team_a_id.eq.${id},team_b_id.eq.${id}`);
    if (matchesQueryError) throw matchesQueryError;
    const matchIds = (matches ?? []).map((m) => m.id);

    // 3. 관련 player_records 삭제 (선수 기록 + 경기 기록)
    if (playerIds.length > 0) {
      const { error } = await supabase
        .from('player_records')
        .delete()
        .in('player_id', playerIds);
      if (error) throw error;
    }
    if (matchIds.length > 0) {
      const { error } = await supabase
        .from('player_records')
        .delete()
        .in('match_id', matchIds);
      if (error) throw error;
    }

    // 4. 선수 삭제
    const { error: playersDeleteError } = await supabase
      .from('players')
      .delete()
      .eq('team_id', id);
    if (playersDeleteError) throw playersDeleteError;

    // 5. 경기 삭제
    if (matchIds.length > 0) {
      const { error: matchesDeleteError } = await supabase
        .from('matches')
        .delete()
        .in('id', matchIds);
      if (matchesDeleteError) throw matchesDeleteError;
    }

    // 6. 팀 삭제
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};
