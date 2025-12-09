import { create } from 'zustand';
import type { CellData } from '../components/SongEditor/TrackRoller';

interface NoteEditStore {
  currentNotes: Array<CellData>;
  pendingAddedNotes: Array<CellData>;
  pendingDeletedNotes: Array<CellData>;
  addToPendingAddedNotes: (note: CellData) => void;
  removeFromPendingAddedNotes: (row: number, column: number) => void;
  addToPendingDeletedNotes: (note: CellData) => void;
  removeFromPendingDeletedNotes: (row: number, column: number) => void;
  setCurrentNotes: (notes: Array<CellData>) => void;
  setPendingAddedNotes: (notes: Array<CellData>) => void;
  setPendingDeletedNotes: (notes: Array<CellData>) => void;
  addNote: (note: CellData) => void;
  deleteNote: (row: number, column: number) => void;
}

export const useNoteEditStore = create<NoteEditStore>(set => ({
  currentNotes: [],
  setCurrentNotes: notes => set({ currentNotes: notes }),
  addNote: note => set(state => ({ currentNotes: [...state.currentNotes, note] })),
  deleteNote: (row, column) =>
    set(state => ({
      currentNotes: state.currentNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),

  pendingAddedNotes: [],
  setPendingAddedNotes: notes => set({ pendingAddedNotes: notes }),
  addToPendingAddedNotes: note =>
    set(state => ({ pendingAddedNotes: [...state.pendingAddedNotes, note] })),
  removeFromPendingAddedNotes: (row, column) =>
    set(state => ({
      pendingAddedNotes: state.pendingAddedNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),

  pendingDeletedNotes: [],
  setPendingDeletedNotes: notes => set({ pendingDeletedNotes: notes }),
  addToPendingDeletedNotes: note =>
    set(state => ({ pendingDeletedNotes: [...state.pendingDeletedNotes, note] })),
  removeFromPendingDeletedNotes: (row, column) =>
    set(state => ({
      pendingDeletedNotes: state.pendingDeletedNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),


}));
