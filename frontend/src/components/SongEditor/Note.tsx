import { Tooltip } from 'antd';
import React from 'react';

const Note: React.FC<{ cell: any }> = ({ cell }) => {
  return (
    <Tooltip title={cell.content.description || cell.content.title}>
      <div
        style={{
          backgroundColor: cell.content.color,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
        }}
      />
    </Tooltip>
  );
};

export default Note;
