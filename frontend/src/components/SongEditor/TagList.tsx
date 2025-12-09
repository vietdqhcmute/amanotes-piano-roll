import { Tag } from 'antd';
import React from 'react';
import { colors } from '../../utils/constants';
import type { Tag as TagType } from '../../types/api';

const TagList: React.FC<{ tags: TagType[] }> = ({ tags }) => {
  return (
    tags &&
    tags.length > 0 && (
      <div style={{ marginTop: '16px' }}>
        {tags.map(tag => (
          <Tag
            key={tag.id}
            color={colors.colorHighlight}
            variant='outlined'
            style={{ marginBottom: '4px', marginRight: '8px' }}
          >
            {tag.label}
          </Tag>
        ))}
      </div>
    )
  );
};

export default TagList;
