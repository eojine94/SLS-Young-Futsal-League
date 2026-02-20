import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playerApi } from '@services/playerApi';
import type { Player } from '../types';

function mapPlayer(row: { id: string; name: string; number: number; role: string; team_id: string }): Player {
  return {
    id: row.id,
    name: row.name,
    number: row.number,
    role: row.role as 'leader' | 'member',
    teamId: row.team_id,
  };
}

export function usePlayers(teamId: string) {
  return useQuery({
    queryKey: ['players', teamId],
    queryFn: () => playerApi.getByTeamId(teamId),
    select: (data) => data.map(mapPlayer),
  });
}

export function usePlayer(playerId: string) {
  return useQuery({
    queryKey: ['players', 'detail', playerId],
    queryFn: () => playerApi.getById(playerId),
    select: mapPlayer,
  });
}

export function useCreatePlayers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (players: { name: string; number: number; team_id: string; role: string }[]) =>
      playerApi.createMany(players),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}

export function useUpdatePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: { name?: string; number?: number; role?: string } }) =>
      playerApi.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => playerApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['players'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}
