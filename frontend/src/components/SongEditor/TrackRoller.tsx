
import React, { useCallback, useMemo, type JSX } from 'react';
import styled from 'styled-components';
import Note from './Note';
import { colors } from '../../utils/constants';

const Grid = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-columns: 50px repeat(${props => Math.min(props.columns - 1, 49)}, minmax(60px, 1fr));
  grid-template-rows: repeat(${props => Math.min(props.rows, 100)}, 40px);
  gap: 0;
  overflow: auto;
  max-height: 80vh;
  max-width: 100vw;
`
const Header = styled.div<{ headerCount: number }>`
  grid-column: 2 / ${props => props.headerCount + 2};
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(${props => props.headerCount}, 1fr);
  gap: 0;
`
const HeaderElement = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Sidebar = styled.div<{ sidebarCount: number }>`
  grid-column: 1 / 2;
  grid-row: 2 / ${props => props.sidebarCount + 2};
  display: grid;
  grid-template-rows: repeat(${props => props.sidebarCount}, 1fr);
  gap: 0;
  max-width: 50px;
`
const SidebarElement = styled.span<{ index: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Cell = styled.div<{ row: number; column: number; isActive?: boolean }>`
  grid-column: ${props => props.column} / ${props => props.column + 1};
  grid-row: ${props => props.row} / ${props => props.row + 1};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: ${props => {
    const dataRowIndex = props.row - 3;
    // Add dark border for every 10th row (multiples of 10)
    return (dataRowIndex + 1) % 10 === 0 ? '2px solid #a5a5a5' : '1px solid #d9d9d9';
  }};

  &:hover {
    background-color: ${props => props.isActive ? colors.colorHighlight : '#e9e9e9'};
  }
`

export interface CellData {
  rowNumber: number;
  columnNumber: number;
  content: CellContent;
  isActive?: boolean;
  onClick?: () => void;
  note?: { time: number; track: number; title: string; description?: string; color: string; noteId: number };
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
  sidebarItems?: string[];
  cells?: CellData[];
  onCellClick?: (rowIndex: number, columnIndex: number, headerLabel?: string, sidebarLabel?: string, cell?: CellData) => void;
}

const DEFAULT_HEADERS = ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7', 'Header 8'];
const DEFAULT_SIDEBAR_ITEMS = ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5', 'Row 6'];

const TrackRoller: React.FC<TrackRollProps> = ({
  headers = DEFAULT_HEADERS,
  sidebarItems = DEFAULT_SIDEBAR_ITEMS,
  cells = [],
  onCellClick: onCellClickProp
}) => {

  // NOTE: +1 for the empty first corner cell
  const totalColumns = useMemo(() => headers.length + 1, [headers.length]);
  const totalRows = useMemo(() => sidebarItems.length + 1, [sidebarItems.length]);

  const onCellClick = useCallback((rowIndex: number, columnIndex: number, cell?: CellData) => {
    const headerLabel = headers[columnIndex - 2];
    const sidebarLabel = sidebarItems[rowIndex - 1];

    if (onCellClickProp) {
      onCellClickProp(rowIndex, columnIndex, headerLabel, sidebarLabel, cell);
    }
  }, [headers, sidebarItems, onCellClickProp])

  const cellsMap = useMemo(() => {
    const map = new Map<string, CellData>();
    cells.forEach(cell => {
      map.set(`${cell.rowNumber}-${cell.columnNumber}`, cell);
    });
    return map;
  }, [cells]);

  const allCells = useMemo(() => {
    const cellElements: JSX.Element[] = [];

    // Limit grid size to prevent UI blocking
    const maxRows = Math.min(totalRows, 100); // Limit to 100 rows max
    const maxCols = Math.min(totalColumns, 50); // Limit to 50 columns max

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
            <Cell
              key={cellKey}
              row={row}
              column={col}
              onClick={() => onCellClick(row, col)}
            />
          );
        }
      }
    }

    return cellElements;
  }, [cellsMap, onCellClick, totalColumns, totalRows]);

  // Early return if no data to prevent unnecessary rendering
  if (!headers.length || !sidebarItems.length) {
    return <div>No data to display</div>;
  }

  return (
    <div className="track-roller">
      <Grid
        className='grid-container'
        columns={totalColumns}
        rows={totalRows}
      >
        <Header
          className="header"
          headerCount={headers.length}
        >
          {headers.map((header, index) => (
            <HeaderElement key={index}>{header}</HeaderElement>
          ))}
        </Header>
        <Sidebar
          className="sidebar"
          sidebarCount={sidebarItems.length}
        >
          {sidebarItems.map((item, index) => (
            <SidebarElement key={index} index={index}>{item}</SidebarElement>
          ))}
        </Sidebar>

        {allCells}
      </Grid>
    </div>
  )
};
export default TrackRoller;
