import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi } from '@services/teamApi';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: teamApi.getAll,
  });
}

export function useCreateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => teamApi.create(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
    },
  });
}

export function useUpdateTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) => teamApi.update(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
    },
  });
}

export function useDeleteTeam() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => teamApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['rankings'] });
      queryClient.invalidateQueries({ queryKey: ['matches'] });
    },
  });
}
