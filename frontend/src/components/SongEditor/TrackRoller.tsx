
import React, { useCallback } from 'react';
import styled from 'styled-components';
import Note from './Note';

const Grid = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns}, 100px);
  grid-template-rows: repeat(${props => props.rows}, 30px);
  gap: 2px;
`
const Header = styled.div<{ headerCount: number }>`
  grid-column: 2 / ${props => props.headerCount + 2};
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(${props => props.headerCount}, 1fr);
  gap: 2px;
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
  gap: 2px;
`
const SidebarElement = styled.span`
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

  &:hover {
    background-color: ${props => props.isActive ? '#A32EFF' : '#e9e9e9'};
  }
`

export interface CellData {
  rowNumber: number;
  columnNumber: number;
  content: CellContent;
  isActive?: boolean;
  onClick?: () => void;
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
  onCellClick?: (rowIndex: number, columnIndex: number, headerLabel?: string, sidebarLabel?: string) => void;
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
  const totalColumns = headers.length + 1;
  const totalRows = sidebarItems.length + 1;

  const onCellClick = useCallback((rowIndex: number, columnIndex: number) => {
    const headerLabel = headers[columnIndex - 1];
    const sidebarLabel = sidebarItems[rowIndex - 1];

    if (onCellClickProp) {
      onCellClickProp(rowIndex, columnIndex, headerLabel, sidebarLabel);
    }
  }, [headers, sidebarItems, onCellClickProp])

  // Generate all grid cells with click handlers
  const generateAllCells = useCallback(() => {
    const allCells = [];

    // Generate cells for the main grid area (excluding header and sidebar)
    for (let row = 2; row <= totalRows; row++) {
      for (let col = 2; col <= totalColumns; col++) {
        const existingCell = cells.find(c => c.rowNumber === row && c.columnNumber === col);

        if (existingCell) {
          // Create existing cell that has note data
          allCells.push(
            <Cell
              key={`${row}-${col}`}
              row={row}
              column={col}
              isActive={existingCell.isActive}
              onClick={() => {
                onCellClick(row, col);
              }}
            >
              <Note cell={existingCell} />
            </Cell>
          );
        } else {
          // Create empty clickable cell
          allCells.push(
            <Cell
              key={`${row}-${col}`}
              row={row}
              column={col}
              onClick={() => onCellClick(row, col)}
            />
          );
        }
      }
    }

    return allCells;
  }, [cells, onCellClick, totalColumns, totalRows]);

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
            <SidebarElement key={index}>{item}</SidebarElement>
          ))}
        </Sidebar>

        {generateAllCells()}
      </Grid>
    </div>
  )
};
export default TrackRoller;
