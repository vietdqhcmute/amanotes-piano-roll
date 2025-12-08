import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { songsApi } from '../utils/api';
import type { Song, CreateSongData, UpdateSongData } from '../types/api';
import useCustomNotification from '../context/Notification/useCustomNotification';

export const songKeys = {
  all: ['songs'] as const,
  lists: () => [...songKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...songKeys.lists(), { filters }] as const,
  details: () => [...songKeys.all, 'detail'] as const,
  detail: (id: string) => [...songKeys.details(), id] as const,
};

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
  const { notifySuccess, notifyError } = useCustomNotification();
  const queryClient = useQueryClient();

  return useMutation<Song, Error, CreateSongData>({
    mutationFn: songsApi.create,
    onSuccess: () => {
      notifySuccess('Song created successfully');
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
    onError: (error) => {
      notifyError(`Error creating song: ${error.message}`);
    }
  });
};

export const useUpdateSong = () => {
  const { notifySuccess, notifyError } = useCustomNotification();
  const queryClient = useQueryClient();

  return useMutation<Song, Error, { id: string; data: UpdateSongData }>({
    mutationFn: ({ id, data }) => songsApi.update(id, data),
    onSuccess: (_, variables) => {
      notifySuccess('Song updated successfully');
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
      queryClient.invalidateQueries({ queryKey: songKeys.detail(variables.id) });
    },
    onError: (error) => {
      notifyError(`Error updating song: ${error.message}`);
    }
  });
};

export const useDeleteSong = () => {
  const { notifySuccess } = useCustomNotification();
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: songsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
    onSettled: () => {
      notifySuccess('Song deleted successfully');
      queryClient.invalidateQueries({ queryKey: songKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.lists() });
    },
  });
};
