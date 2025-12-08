import type { Song, CreateSongData, UpdateSongData, Tag, CreateTagData, UpdateTagData, Note, CreateNoteData, UpdateNoteData, Instrument, Track, CreateTrackData, UpdateTrackData } from '../types/api';

export const API_BASE_URL = import.meta.env.VITE_API_URL + '/api/v1' || '/api/v1';

const camelToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(camelToSnakeCase);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result, key) => {
      const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      result[snakeKey] = camelToSnakeCase(obj[key]);
      return result;
    }, {} as any);
  }
  return obj;
};

// Generic API function
export const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  let config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

  // Convert request body from camelCase to snake_case if it's a JSON payload
  if (config.body && (config.headers as any)?.['Content-Type']?.includes('application/json')) {
    try {
      const parsedBody = JSON.parse(config.body as string);
      const snakeCaseBody = camelToSnakeCase(parsedBody);
      config.body = JSON.stringify(snakeCaseBody);
    } catch (e) {
      // If parsing fails, keep original body
    }
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// API endpoints
export const songsApi = {
  getAll: (): Promise<Song[]> => apiRequest<Song[]>('/songs'),
  getById: (id: string): Promise<Song> => apiRequest<Song>(`/songs/${id}`),
  create: (data: CreateSongData): Promise<Song> => apiRequest<Song>('/songs', {
    method: 'POST',
    body: JSON.stringify({ song: data }),
  }),
  update: (id: string, data: UpdateSongData): Promise<Song> => apiRequest<Song>(`/songs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ song: data }),
  }),
  delete: (id: string): Promise<void> => apiRequest<void>(`/songs/${id}`, {
    method: 'DELETE',
  }),
};

export const tagsApi = {
  getAll: (): Promise<Tag[]> => apiRequest<Tag[]>('/tags'),
  getById: (id: string): Promise<Tag> => apiRequest<Tag>(`/tags/${id}`),
  create: (data: CreateTagData): Promise<Tag> => apiRequest<Tag>('/tags', {
    method: 'POST',
    body: JSON.stringify({ tag: data }),
  }),
  update: (id: string, data: UpdateTagData): Promise<Tag> => apiRequest<Tag>(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ tag: data }),
  }),
  delete: (id: string): Promise<void> => apiRequest<void>(`/tags/${id}`, {
    method: 'DELETE',
  }),
};

export const notesApi = {
  getAll: (songId: string): Promise<Note[]> => apiRequest<Note[]>(`/songs/${songId}/notes`),
  getById: (songId: string, id: string): Promise<Note> => apiRequest<Note>(`/songs/${songId}/notes/${id}`),
  create: (songId: string, data: CreateNoteData): Promise<Note> => apiRequest<Note>(`/songs/${songId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note: data }),
  }),
  update: (songId: string, id: string, data: UpdateNoteData): Promise<Note> => apiRequest<Note>(`/songs/${songId}/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ note: data }),
  }),
  delete: (songId: string, id: string): Promise<void> => apiRequest<void>(`/songs/${songId}/notes/${id}`, {
    method: 'DELETE',
  }),
};

export const instrumentsApi = {
  getAll: (): Promise<Instrument[]> => apiRequest<Instrument[]>('/instruments'),
};

export const tracksApi = {
  getAll: (songId: string): Promise<Track[]> => apiRequest<Track[]>(`/songs/${songId}/tracks`),
  getById: (songId: string, id: string): Promise<Track> => apiRequest<Track>(`/songs/${songId}/tracks/${id}`),
  create: (songId: string, data: CreateTrackData): Promise<Track> => apiRequest<Track>(`/songs/${songId}/tracks`, {
    method: 'POST',
    body: JSON.stringify({ track: data }),
  }),
  update: (songId: string, id: string, data: UpdateTrackData): Promise<Track> => apiRequest<Track>(`/songs/${songId}/tracks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ track: data }),
  }),
  delete: (songId: string, id: string): Promise<void> => apiRequest<void>(`/songs/${songId}/tracks/${id}`, {
    method: 'DELETE',
  }),
};
