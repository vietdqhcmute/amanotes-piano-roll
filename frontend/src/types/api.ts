export interface Song {
  id: number;
  name: string;
  description?: string;
  bpm?: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  tracks?: Track[];
  notes?: Note[];
}

export interface CreateSongData {
  name: string;
  description?: string;
  bpm?: number;
  duration: number;
  tagIds?: number[];
}

export interface UpdateSongData extends Partial<CreateSongData> {}

export interface Tag {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;
  songs?: Song[];
}

export interface CreateTagData {
  label: string;
}

export interface UpdateTagData extends Partial<CreateTagData> {}

export interface Track {
  id: number;
  songId: number;
  instrumentId: number;
  createdAt: string;
  updatedAt: string;
  instrument?: Instrument;
  notes?: Note[];
}

export interface Instrument {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string;
  color: string;
}

export interface Note {
  id: number;
  songId: number;
  trackId: number;
  time: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  track?: Track;
}

export interface CreateNoteData {
  time: number;
  description?: string;
  trackId: number;
}

export interface UpdateNoteData extends Partial<CreateNoteData> {}

export interface ApiError {
  error: string;
}

export interface ValidationError {
  errors: Record<string, string[]>;
}

export interface CreateTrackData {
  instrumentId: number;
  songId: number;
}

export interface UpdateTrackData extends Partial<CreateTrackData> {}
