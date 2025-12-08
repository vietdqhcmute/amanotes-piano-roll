import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagsApi } from '../utils/api';
import type { Tag, CreateTagData, UpdateTagData } from '../types/api';

// Query keys
export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagKeys.details(), id] as const,
};

// Hooks
export const useTags = () => {
  return useQuery<Tag[]>({
    queryKey: tagKeys.lists(),
    queryFn: tagsApi.getAll,
  });
};

export const useTag = (id: string) => {
  return useQuery<Tag>({
    queryKey: tagKeys.detail(id),
    queryFn: () => tagsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation<Tag, Error, CreateTagData>({
    mutationFn: tagsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation<Tag, Error, { id: string; data: UpdateTagData }>({
    mutationFn: ({ id, data }) => tagsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tagKeys.detail(variables.id) });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: tagsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() });
    },
  });
};
