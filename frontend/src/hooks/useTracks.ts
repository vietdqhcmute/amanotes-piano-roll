import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tracksApi } from '../utils/api';
import type { Track, CreateTrackData, UpdateTrackData } from '../types/api';
import { songKeys } from './useSongs';

// Query keys
export const trackKeys = {
  all: ['tracks'] as const,
  lists: () => [...trackKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...trackKeys.lists(), { filters }] as const,
  details: () => [...trackKeys.all, 'detail'] as const,
  detail: (id: string) => [...trackKeys.details(), id] as const,
};

// Hooks
export const useTracks = (songId: string) => {
  return useQuery<Track[]>({
    queryKey: trackKeys.lists(),
    queryFn: () => tracksApi.getAll(songId),
    enabled: !!songId,
  });
}
export const useTrack = (songId: string, id: string) => {
  return useQuery<Track>({
    queryKey: trackKeys.detail(id),
    queryFn: () => tracksApi.getById(songId, id),
    enabled: !!songId && !!id,
  });
};

export const useCreateTrack = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Track, Error, CreateTrackData>({
    mutationFn: (data) => tracksApi.create(songId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.detail(songId) });
    },
  });
};

export const useUpdateTrack = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Track, Error, { id: string; data: UpdateTrackData }>({
    mutationFn: ({ id, data }) => tracksApi.update(songId, id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: trackKeys.lists() });
      queryClient.invalidateQueries({ queryKey: trackKeys.detail(variables.id) });
    },
  });
}
export const useDeleteTrack = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id) => tracksApi.delete(songId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.detail(songId) });
    },
  });
};
