import React, { useCallback, useEffect, useMemo, type JSX } from 'react';
import Note from './Note';
import { colors, DEFAULT_HEADERS, DEFAULT_SIDEBAR_ITEMS } from '../../utils/constants';
import { useNoteEditStore } from '../../stores/noteEditStore';
import { Cell, Grid, Header, HeaderElement, Sidebar, SidebarElement } from './styles';

export interface CellData {
  cellId: string;
  rowNumber: number;
  columnNumber: number;
  content: CellContent;
  isActive?: boolean;
  isTempNote?: boolean;
  onClick?: () => void;
  note?: {
    time: number;
    track: number;
    title: string;
    description?: string;
    color: string;
    noteId: number;
  };
}

export interface CellContent {
  title: string;
  description: string;
  color: string;
}

interface TrackRollProps {
  track?: string;
  notes?: Array<{ time: number; pitch: number; velocity: number }>;
  onNoteChange?: (notes: Array<{ time: number; pitch: number; velocity: number }>) => void;
  headers?: string[];
  headerColors?: string[];
  sidebarItems?: string[];
  cells?: CellData[];
  onCellClick?: () => void;
}


const TrackRoller: React.FC<TrackRollProps> = ({
  headers = DEFAULT_HEADERS,
  headerColors = [],
  sidebarItems = DEFAULT_SIDEBAR_ITEMS,
  cells = [],
  onCellClick: onCellClickProp,
}) => {
  const { currentNotes } = useNoteEditStore();
  const {
    setCurrentNotes,
    addNote,
    deleteNote,
    addToPendingAddedNotes,
    addToPendingDeletedNotes,
    removeFromPendingAddedNotes,
  } = useNoteEditStore();

  // NOTE: +1 for the empty first corner cell
  const totalColumns = useMemo(() => headers.length + 1, [headers.length]);
  const totalRows = useMemo(() => sidebarItems.length + 1, [sidebarItems.length]);

  const onNoteAdd = useCallback(
    (rowIndex: number, columnIndex: number, headerLabel?: string, sidebarLabel?: string) => {
      const newNote = {
        cellId: `r${rowIndex}_c${columnIndex}`,
        columnNumber: columnIndex,
        rowNumber: rowIndex,
        content: {
          title: headerLabel,
          description: '',
          color: headerColors[columnIndex - 2] || colors.colorHighlight,
        },
        isTempNote: true,
        note: {
          time: sidebarLabel,
          track: columnIndex,
        },
      } as unknown as CellData;
      addNote(newNote);
      addToPendingAddedNotes(newNote);
    },
    [addNote, addToPendingAddedNotes, headerColors]
  );

  const onNoteDelete = useCallback(
    (
      rowIndex: number,
      columnIndex: number,
      cell?: CellData
    ) => {
      deleteNote(rowIndex, columnIndex);
      if (cell?.isActive) {
        addToPendingDeletedNotes(cell);
      }
      if (cell?.isTempNote) {
        removeFromPendingAddedNotes(rowIndex, columnIndex);
      }
    },
    [deleteNote, addToPendingDeletedNotes, removeFromPendingAddedNotes]
  );

  const onCellClick = useCallback(
    (rowIndex: number, columnIndex: number, cell?: CellData) => {
      const headerLabel = headers[columnIndex - 2];
      const sidebarLabel = sidebarItems[rowIndex - 2];

      if (cell) {
        onNoteDelete(rowIndex, columnIndex, cell);
      } else {
        onNoteAdd(rowIndex, columnIndex, headerLabel, sidebarLabel);
      }
      if (onCellClickProp) {
        onCellClickProp();
      }
    },
    [headers, onCellClickProp, onNoteAdd, onNoteDelete, sidebarItems]
  );

  const cellsMap = useMemo(() => {
    const map = new Map<string, CellData>();
    currentNotes.forEach(cell => {
      map.set(`${cell.rowNumber}-${cell.columnNumber}`, cell);
    });
    return map;
  }, [currentNotes]);

  const allCells = useMemo(() => {
    const cellElements: JSX.Element[] = [];

    // Limit grid size to prevent UI blocking
    const maxRows = Math.min(totalRows, 100); // Limit to 100 rows max
    const maxCols = Math.min(totalColumns, 10); // Limit to 10 columns max

    // Generate cells for the main grid area (excluding header and sidebar)
    for (let row = 2; row <= maxRows; row++) {
      for (let col = 2; col <= maxCols; col++) {
        const cellKey = `${row}-${col}`;
        const existingCell = cellsMap.get(cellKey);

        if (existingCell) {
          // Create existing cell that has note data
          cellElements.push(
            <Cell
              key={cellKey}
              row={row}
              column={col}
              isActive={existingCell.isActive}
              onClick={() => onCellClick(row, col, existingCell)}
            >
              <Note cell={existingCell} />
            </Cell>
          );
        } else {
          // Create empty clickable cell
          cellElements.push(
            <Cell key={cellKey} row={row} column={col} onClick={() => onCellClick(row, col)} />
          );
        }
      }
    }

    return cellElements;
  }, [cellsMap, onCellClick, totalColumns, totalRows]);

  useEffect(() => {
    setCurrentNotes(cells);
  }, [cells, setCurrentNotes]);

  if (!headers.length || !sidebarItems.length) {
    return <div>No data to display</div>;
  }

  return (
    <div className='track-roller'>
      <Grid className='grid-container' columns={totalColumns} rows={totalRows}>
        <Header className='header' headerCount={headers.length}>
          {headers.map((header, index) => (
            <HeaderElement key={index}>{header}</HeaderElement>
          ))}
        </Header>
        <Sidebar className='sidebar' sidebarCount={sidebarItems.length}>
          {sidebarItems.map((item, index) => (
            <SidebarElement key={index} index={index}>
              {item}
            </SidebarElement>
          ))}
        </Sidebar>

        {allCells}
      </Grid>
    </div>
  );
};
export default TrackRoller;
