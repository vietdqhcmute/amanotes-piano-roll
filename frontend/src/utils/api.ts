// Base API configuration
export const API_BASE_URL = '/api/v1';

// Generic API function
export const apiRequest = async (endpoint: string, options?: RequestInit) => {
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
  getAll: () => apiRequest('/songs'),
  getById: (id: string) => apiRequest(`/songs/${id}`),
  create: (data: any) => apiRequest('/songs', {
    method: 'POST',
    body: JSON.stringify({ song: data }),
  }),
  update: (id: string, data: any) => apiRequest(`/songs/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ song: data }),
  }),
  delete: (id: string) => apiRequest(`/songs/${id}`, {
    method: 'DELETE',
  }),
};

export const tagsApi = {
  getAll: () => apiRequest('/tags'),
  getById: (id: string) => apiRequest(`/tags/${id}`),
  create: (data: any) => apiRequest('/tags', {
    method: 'POST',
    body: JSON.stringify({ tag: data }),
  }),
  update: (id: string, data: any) => apiRequest(`/tags/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ tag: data }),
  }),
  delete: (id: string) => apiRequest(`/tags/${id}`, {
    method: 'DELETE',
  }),
};

export const notesApi = {
  getAll: (songId: string) => apiRequest(`/songs/${songId}/notes`),
  getById: (songId: string, id: string) => apiRequest(`/songs/${songId}/notes/${id}`),
  create: (songId: string, data: any) => apiRequest(`/songs/${songId}/notes`, {
    method: 'POST',
    body: JSON.stringify({ note: data }),
  }),
  update: (songId: string, id: string, data: any) => apiRequest(`/songs/${songId}/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ note: data }),
  }),
  delete: (songId: string, id: string) => apiRequest(`/songs/${songId}/notes/${id}`, {
    method: 'DELETE',
  }),
};
