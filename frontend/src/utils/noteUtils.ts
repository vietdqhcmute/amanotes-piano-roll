export interface PendingNote {
  cellId: string;
  // Add other properties as needed
  [key: string]: any;
}

export function deduplicatePendingNotes(
  pendingAddedNotes: PendingNote[],
  pendingDeletedNotes: PendingNote[]
): [PendingNote[], PendingNote[]] {
  console.log({ pendingAddedNotes, pendingDeletedNotes });
  // Create sets of cellIds for efficient lookup
  const addedCellIds = new Set(pendingAddedNotes.map(note => note.cellId));
  const deletedCellIds = new Set(pendingDeletedNotes.map(note => note.cellId));

  // Find common cellIds that exist in both arrays
  const commonCellIds = new Set([...addedCellIds].filter(cellId => deletedCellIds.has(cellId)));

  // Remove items with common cellIds from both arrays
  const dedupedAddedNotes = pendingAddedNotes.filter(note => !commonCellIds.has(note.cellId));

  const dedupedDeletedNotes = pendingDeletedNotes.filter(note => !commonCellIds.has(note.cellId));

  return [dedupedAddedNotes, dedupedDeletedNotes];
}
