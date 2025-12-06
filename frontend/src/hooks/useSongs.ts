import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { songsApi } from '../utils/api';
import type { Song, CreateSongData, UpdateSongData } from '../types/api';

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
  return useQuery<Song[]>({
    queryKey: songKeys.lists(),
    queryFn: songsApi.getAll,
  });
};

export const useSong = (id: string) => {
  return useQuery<Song>({
    queryKey: songKeys.detail(id),
    queryFn: () => songsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateSong = () => {
  const queryClient = useQueryClient();

  return useMutation<Song, Error, CreateSongData>({
    mutationFn: songsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
  });
};

export const useUpdateSong = () => {
  const queryClient = useQueryClient();

  return useMutation<Song, Error, { id: string; data: UpdateSongData }>({
    mutationFn: ({ id, data }) => songsApi.update(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(variables.id) });
    },
  });
};

export const useDeleteSong = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: songsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
  });
};
