import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi } from '../utils/api';
import type { Note, CreateNoteData, UpdateNoteData } from '../types/api';

// Query keys
export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (songId: string, filters?: Record<string, any>) => [...noteKeys.lists(), songId, { filters }] as const,
  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (songId: string, id: string) => [...noteKeys.details(), songId, id] as const,
};

// Hooks
export const useNotes = (songId: string) => {
  return useQuery<Note[]>({
    queryKey: noteKeys.list(songId),
    queryFn: () => notesApi.getAll(songId),
    enabled: !!songId,
  });
};

export const useNote = (songId: string, id: string) => {
  return useQuery<Note>({
    queryKey: noteKeys.detail(songId, id),
    queryFn: () => notesApi.getById(songId, id),
    enabled: !!songId && !!id,
  });
};

export const useCreateNote = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, { data: CreateNoteData }>({
    mutationFn: ({ data }) => notesApi.create(songId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch notes for the specific song
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      // Force immediate refetch
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, { songId: string; id: string; data: UpdateNoteData }>({
    mutationFn: ({ songId, id, data }) => notesApi.update(songId, id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(variables.songId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(variables.songId, variables.id) });
    },
  });
};

export const useDeleteNote = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { noteId: string }>({
    mutationFn: ({ noteId }) => notesApi.delete(songId, noteId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(songId, variables.noteId) });
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
    },
  });
};
