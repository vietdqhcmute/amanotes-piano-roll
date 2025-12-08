import { create } from 'zustand';

interface NoteEditStore {
  currentNotes: Array<{ time: number; pitch: number; velocity: number }>;
  pendingAddedNotes: Array<{ time: number; pitch: number; velocity: number }>;
  pendingDeletedNotes: Array<{ time: number; pitch: number; velocity: number }>;
  addToPendingAddedNotes: (note: { time: number; pitch: number; velocity: number }) => void;
  removeFromPendingAddedNotes: (row: number, column: number) => void;
  addToPendingDeletedNotes: (note: { time: number; pitch: number; velocity: number }) => void;
  removeFromPendingDeletedNotes: (row: number, column: number) => void;
  setCurrentNotes: (notes: Array<{ time: number; pitch: number; velocity: number }>) => void;
  addNote: (note: { time: number; pitch: number; velocity: number }) => void;
  deleteNote: (row: number, column: number) => void;
}

export const useNoteEditStore = create<NoteEditStore>(set => ({
  currentNotes: [],
  pendingAddedNotes: [],
  addToPendingAddedNotes: note =>
    set(state => ({ pendingAddedNotes: [...state.pendingAddedNotes, note] })),
  removeFromPendingAddedNotes: (row, column) =>
    set(state => ({
      pendingAddedNotes: state.pendingAddedNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),
  pendingDeletedNotes: [],
  addToPendingDeletedNotes: note =>
    set(state => ({ pendingDeletedNotes: [...state.pendingDeletedNotes, note] })),
  removeFromPendingDeletedNotes: (row, column) =>
    set(state => ({
      pendingDeletedNotes: state.pendingDeletedNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),
  setCurrentNotes: notes => set({ currentNotes: notes }),
  addNote: note => set(state => ({ currentNotes: [...state.currentNotes, note] })),
  deleteNote: (row, column) =>
    set(state => ({
      currentNotes: state.currentNotes.filter(
        note => note.rowNumber !== row || note.columnNumber !== column
      ),
    })),
}));
