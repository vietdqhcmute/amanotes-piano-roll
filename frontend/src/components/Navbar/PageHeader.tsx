import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { colors } from '../../utils/constants';

const { Header } = Layout;

interface PageHeaderProps {
  title: string;
  backLink?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, backLink }) => {
  return (
    <Header style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      padding: '0 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {backLink && (
          <Link to={backLink} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <ArrowLeftOutlined style={{ fontSize: '20px', color: colors.colorPrimary }} />
          </Link>
        )}
        <Typography.Title level={2} style={{ margin: 0, color: colors.colorPrimary }}>
          {title}
        </Typography.Title>
      </div>
    </Header>
  )
}

export default PageHeader
