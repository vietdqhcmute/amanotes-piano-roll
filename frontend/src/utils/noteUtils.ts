export interface PendingNote {
  cellId: string;
  // Add other properties as needed
  [key: string]: any;
}

export function deduplicatePendingNotes(
  pendingAddedNotes: PendingNote[],
  pendingDeletedNotes: PendingNote[]
): { dedupedAddedNotes: PendingNote[], dedupedDeletedNotes: PendingNote[] } {
  const addedCellIds = new Set(pendingAddedNotes.map(note => note.cellId));
  const deletedCellIds = new Set(pendingDeletedNotes.map(note => note.cellId));

  const commonCellIds = new Set([...addedCellIds].filter(cellId => deletedCellIds.has(cellId)));

  const dedupedAddedNotes = pendingAddedNotes.filter(note => !commonCellIds.has(note.cellId));
  const dedupedDeletedNotes = pendingDeletedNotes.filter(note => !commonCellIds.has(note.cellId));

  return { dedupedAddedNotes, dedupedDeletedNotes };
}
