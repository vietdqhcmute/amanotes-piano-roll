import styled from 'styled-components';
import { colors } from '../../utils/constants';

export const Grid = styled.div<{ columns: number; rows: number }>`
  display: grid;
  grid-template-columns: 50px repeat(${props => Math.min(props.columns - 1, 49)}, minmax(60px, 1fr));
  grid-template-rows: repeat(${props => Math.min(props.rows, 100)}, 40px);
  gap: 0;
  overflow: auto;
  max-height: 80vh;
  max-width: 100vw;
`;
export const Header = styled.div<{ headerCount: number }>`
  grid-column: 2 / ${props => props.headerCount + 2};
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: repeat(${props => props.headerCount}, 1fr);
  gap: 0;
`;
export const HeaderElement = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Sidebar = styled.div<{ sidebarCount: number }>`
  grid-column: 1 / 2;
  grid-row: 2 / ${props => props.sidebarCount + 2};
  display: grid;
  grid-template-rows: repeat(${props => props.sidebarCount}, 1fr);
  gap: 0;
  max-width: 50px;
`;
export const SidebarElement = styled.span<{ index: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Cell = styled.div<{ row: number; column: number; isActive?: boolean }>`
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
    background-color: ${props => (props.isActive ? colors.colorHighlight : '#e9e9e9')};
  }
`;
