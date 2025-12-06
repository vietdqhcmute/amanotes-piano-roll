import type { CellData } from "../components/SongEditor/TrackRoller";
import type { NotesProps } from "../pages/SongDetail";

export const calculateTimeResolution = (notes: NotesProps[]): number => {
  if (notes.length === 0) return 1;

  let smallestDecimal = 1;
  for (const note of notes) {
    const timeStr = note.time.toString();
    if (timeStr.includes('.')) {
      const decimalPart = timeStr.split('.')[1];

      if (decimalPart.includes('1') || decimalPart.includes('2') || decimalPart.includes('3') || decimalPart.includes('4') ||
        decimalPart.includes('6') || decimalPart.includes('7') || decimalPart.includes('8') || decimalPart.includes('9')) {
        smallestDecimal = Math.min(smallestDecimal, 0.1);
      } else if (decimalPart === '5') {
        smallestDecimal = Math.min(smallestDecimal, 0.5);
      }
    }
  }

  return smallestDecimal;
};

export const convertNotesToCells = (
  notes: NotesProps[],
  timeResolution: number = 1
): CellData[] => {
  return notes.map(note => ({
    // Convert time based on dynamic resolution: time / resolution gives the index, +2 for header row + 1-based indexing
    rowNumber: Math.round(note.time / timeResolution) + 2,
    columnNumber: note.track + 1, // +1 for sidebar column + 1-based indexing
    content: {
      title: note.title,
      description: note.description || '',
      color: note.color
    },
    isActive: true,
  }));
};

export const generateTimeLabels = (totalDuration: number, timeResolution: number): string[] => {
  const numSteps = Math.ceil(totalDuration / timeResolution);
  return Array.from({ length: numSteps }, (_, i) => {
    const time = i * timeResolution;
    return time % 1 === 0 ? `${time}s` : `${time.toFixed(1)}s`;
  });
};
