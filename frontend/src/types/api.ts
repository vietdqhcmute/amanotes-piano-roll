// Song related types
export interface Song {
  id: number;
  name: string;
  description?: string;
  bpm?: number;
  duration: number;
  genre?: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
  tracks?: Track[];
  notes?: Note[];
}

export interface CreateSongData {
  name: string;
  description?: string;
  bpm?: number;
  duration: number;
  genre?: string;
  tag_ids?: number[];
}

export interface UpdateSongData extends Partial<CreateSongData> {}

// Tag related types
export interface Tag {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
  songs?: Song[];
}

export interface CreateTagData {
  label: string;
}

export interface UpdateTagData extends Partial<CreateTagData> {}

// Track related types
export interface Track {
  id: number;
  song_id: number;
  instrument_id: number;
  created_at: string;
  updated_at: string;
  instrument?: Instrument;
  notes?: Note[];
}

export interface Instrument {
  id: number;
  label: string;
  created_at: string;
  updated_at: string;
}

// Note related types
export interface Note {
  id: number;
  song_id: number;
  track_id: number;
  time: number;
  description?: string;
  created_at: string;
  updated_at: string;
  track?: Track;
}

export interface CreateNoteData {
  time: number;
  description?: string;
  track_id: number;
}

export interface UpdateNoteData extends Partial<CreateNoteData> {}

// API Response types
export interface ApiError {
  error: string;
}

export interface ValidationError {
  errors: Record<string, string[]>;
}
