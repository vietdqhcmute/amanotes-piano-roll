import React from 'react';
import { List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface SongCardProps {
  id: string | number;
  name: string;
  description: string;
  totalDuration: number;
}

const SongCard: React.FC<SongCardProps> = ({ id, name, description, totalDuration }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/song-detail/${id}`);
  };

  return (
    <List.Item
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '16px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0'
      }}
    >
      <List.Item.Meta
        title={
          <Typography.Text
            strong
            style={{
              cursor: 'pointer',
              color: '#1890ff',
              fontSize: '18px'
            }}
            onClick={handleTitleClick}
          >
            {name}
          </Typography.Text>
        }
        description={
          <div style={{ marginTop: '8px' }}>
            <Typography.Text type="secondary" style={{ fontSize: '14px' }}>
              {description}
            </Typography.Text>
            <br />
            <Typography.Text type="secondary" style={{ fontSize: '12px', marginTop: '4px' }}>
              Duration: {totalDuration}s
            </Typography.Text>
          </div>
        }
      />
    </List.Item>
  );
};

export default SongCard;
