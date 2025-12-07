import type { Instrument } from "../types/api";
import { useQuery } from '@tanstack/react-query';
import { instrumentsApi } from '../utils/api';

export const instrumentKeys = {
  all: ['instruments'] as const,
  lists: () => [...instrumentKeys.all, 'list'] as const,
};

export const useInstruments = () => {
  return useQuery<Instrument[]>({
    queryKey: instrumentKeys.lists(),
    queryFn: instrumentsApi.getAll,
  });
};

