import { create } from 'zustand';
import type { Song } from '../types/api';

interface SongEditStore {
  selectedSong: Song | null;
  isUpdateModalOpen: boolean;
  setSelectedSong: (song: Song | null) => void;
  openUpdateModal: (song: Song) => void;
  closeUpdateModal: () => void;
}

export const useSongEditStore = create<SongEditStore>((set) => ({
  selectedSong: null,
  isUpdateModalOpen: false,
  setSelectedSong: (song) => set({ selectedSong: song }),
  openUpdateModal: (song) => set({ selectedSong: song, isUpdateModalOpen: true }),
  closeUpdateModal: () => set({ selectedSong: null, isUpdateModalOpen: false }),
}));
