
import { Tooltip } from 'antd';
import React from 'react';
import styled from 'styled-components';

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

const Main = styled.div`
  grid-column: 2 / 5;
  grid-row: 2 / 5;
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
}

const TrackRoller: React.FC<TrackRollProps> = ({
  headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5', 'Header 6', 'Header 7', 'Header 8'],
  sidebarItems = ['Row 1', 'Row 2', 'Row 3', 'Row 4', 'Row 5', 'Row 6'],
  cells = []
}) => {

  // NOTE: +1 for the empty first corner cell
  const totalColumns = headers.length + 1;
  const totalRows = sidebarItems.length + 1;

  return (
    <div className="track-roller">
      <h2>Track Roller</h2>
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

        {/* Render dynamic cells */}
        {cells.map((cell, index) => (
          <Cell
            key={index}
            row={cell.rowNumber}
            column={cell.columnNumber}
            isActive={cell.isActive}
            onClick={cell.onClick}
          >
            <Tooltip title={cell.content.description || cell.content.title}>
              <div style={{
                backgroundColor: cell.content.color,
                width: '20px',
                height: '20px',
                borderRadius: '50%'
              }}></div>
            </Tooltip>
          </Cell>
        ))}
      </Grid>
    </div>
  )
};
export default TrackRoller;
