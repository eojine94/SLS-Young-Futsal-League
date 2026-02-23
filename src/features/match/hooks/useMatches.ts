import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchApi } from '@services/matchApi';
import { playerRecordApi } from '@services/playerRecordApi';
import { formatMatchDate } from '@shared/utils/dateFormat';
import type { Match } from '../types';

type MatchRow = Awaited<ReturnType<typeof matchApi.getAll>>[number];

function mapMatch(row: MatchRow): Match {
  return {
    id: row.id,
    homeTeamId: row.team_a_id,
    awayTeamId: row.team_b_id,
    homeTeam: row.team_a.name,
    awayTeam: row.team_b.name,
    date: formatMatchDate(row.match_date),
    rawDate: row.match_date,
    time: row.match_time.slice(0, 5),
    location: row.location,
    homeScore: row.team_a_score ?? undefined,
    awayScore: row.team_b_score ?? undefined,
    hasResult: row.team_a_score !== null,
  };
}

export function useMatches() {
  return useQuery({
    queryKey: ['matches'],
    queryFn: matchApi.getAll,
    select: (data) => data.map(mapMatch),
  });
}

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: ['matches', matchId],
    queryFn: () => matchApi.getById(matchId),
    select: mapMatch,
  });
}

export function useCreateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}

export function useUpdateMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...updates }: { id: string; team_a_id?: string; team_b_id?: string; match_date?: string; match_time?: string; location?: string; team_a_score?: number | null; team_b_score?: number | null }) =>
      matchApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}

export function useDeleteMatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: matchApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}

export function useMatchRecords(matchId: string) {
  return useQuery({
    queryKey: ['matches', 'records', matchId],
    queryFn: () => playerRecordApi.getByMatchId(matchId),
  });
}

export function useSubmitResult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      matchId: string;
      teamAScore: number;
      teamBScore: number;
      records: { player_id: string; goals: number; assists: number }[];
    }) => {
      await matchApi.update(params.matchId, {
        team_a_score: params.teamAScore,
        team_b_score: params.teamBScore,
      });

      // 기존 기록 삭제 후 새로 등록
      await playerRecordApi.deleteByMatchId(params.matchId);

      if (params.records.length > 0) {
        await playerRecordApi.upsertMany(
          params.records.map((r) => ({ ...r, match_id: params.matchId })),
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}
