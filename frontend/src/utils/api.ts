import { Song, CreateSongData, UpdateSongData, Tag, CreateTagData, UpdateTagData, Note, CreateNoteData, UpdateNoteData } from '../types/api';

// Base API configuration
export const API_BASE_URL = '/api/v1';

// Generic API function
export const apiRequest = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  };

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
};export const tagsApi = {
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
