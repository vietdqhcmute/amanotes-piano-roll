import React from 'react';
import { List, Typography, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { colors } from '../utils/constants';

interface SongCardProps {
  id: string | number;
  name: string;
  description: string;
  totalDuration: number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const SongCard: React.FC<SongCardProps> = ({ id, name, description, totalDuration, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/song-detail/${id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(id);
  };

  return (
    <List.Item
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        marginBottom: '16px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        border: '1px solid #f0f0f0',
        position: 'relative'
      }}
    >
      <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEdit}
            style={{ color: colors.colorPrimary }}
            title="Edit Song"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            style={{ color: '#ff4d4f' }}
            title="Delete Song"
          />
        </Space>
      </div>

      <List.Item.Meta
        title={
          <Typography.Text
            style={{
              color: colors.colorPrimary,
              cursor: 'pointer',
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
