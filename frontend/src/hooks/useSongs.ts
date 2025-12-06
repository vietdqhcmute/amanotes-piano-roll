import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { songsApi } from '../utils/api';

// Query keys
export const songKeys = {
  all: ['songs'] as const,
  lists: () => [...songKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...songKeys.lists(), { filters }] as const,
  details: () => [...songKeys.all, 'detail'] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};

// Hooks
export const useSongs = () => {
  return useQuery({
    queryKey: songKeys.lists(),
    queryFn: songsApi.getAll,
  });
};

export const useSong = (id: string) => {
  return useQuery({
    queryKey: songKeys.detail(id),
    queryFn: () => songsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: songsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
  });
};

export const useUpdateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => songsApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(variables.id) });
    },
  });
};

export const useDeleteSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: songsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
  });
};
