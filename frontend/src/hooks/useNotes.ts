import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi } from '../utils/api';
import type { Note, CreateNoteData, UpdateNoteData } from '../types/api';
import useCustomNotification from '../context/Notification/useCustomNotification';
import { useNoteEditStore } from '../stores/noteEditStore';

export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (songId: string, filters?: Record<string, any>) =>
    [...noteKeys.lists(), songId, { filters }] as const,
  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (songId: string, id: string) => [...noteKeys.details(), songId, id] as const,
};

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
  const { notifyError } = useCustomNotification();
  const queryClient = useQueryClient();

  return useMutation<Note, Error, { data: CreateNoteData }>({
    mutationFn: ({ data }) => notesApi.create(songId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
    },
    onError: error => {
      if (error.message.includes('422')) {
        notifyError('Can not create note that overlaps with an existing note.');
        return;
      }
      notifyError(`Failed to create note: ${error.message}`);
    },
  });
};

export const useCreateMultipleNotes = (songId: string) => {
  const { setPendingAddedNotes } = useNoteEditStore();
  const { notifyError } = useCustomNotification();
  const queryClient = useQueryClient();

  const mutation = useMutation<Note[], Error, { data: CreateNoteData[] }>({
    mutationFn: ({ data }) => notesApi.createMultiple(songId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
      setPendingAddedNotes([]);
    },
    onError: error => {
      notifyError(`Failed to create notes: ${error.message}`);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, { songId: string; id: string; data: UpdateNoteData }>({
    mutationFn: ({ songId, id, data }) => notesApi.update(songId, id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(variables.songId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(variables.songId, variables.id) });
    },
  });
};

export const useDeleteNote = (songId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { noteId: string }>({
    mutationFn: ({ noteId }) => notesApi.delete(songId, noteId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      queryClient.invalidateQueries({ queryKey: noteKeys.detail(songId, variables.noteId) });
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
    },
  });
};

export const useDeleteMultipleNotes = (songId: string) => {
  const { setPendingDeletedNotes } = useNoteEditStore();

  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, { noteIds: string[] }>({
    mutationFn: ({ noteIds }) => notesApi.deleteMultiple(songId, noteIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.list(songId) });
      queryClient.refetchQueries({ queryKey: noteKeys.list(songId) });
      setPendingDeletedNotes([]);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
  };
};
