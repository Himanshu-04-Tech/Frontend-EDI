import React from 'react';
import { Layout, Button, Space, Avatar, Dropdown, theme } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined, DashboardOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export const Navbar = ({ collapsed, setCollapsed }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'username',
      label: <span style={{ fontWeight: '600' }}>{user?.username || 'Guest User'}</span>,
      disabled: true,
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Header
      style={{
        padding: '0 24px',
        background: 'rgba(22, 26, 34, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${token.colorBorderSecondary}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px',
      }}
    >
      <Space size="middle">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: '16px',
            width: 40,
            height: 40,
            color: token.colorText,
          }}
        />
        <span style={{ fontSize: '18px', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
          Credit Risk AI Core
        </span>
      </Space>

      <Space size="large">
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '8px' }}>
            <Avatar style={{ backgroundColor: token.colorPrimary }} icon={<UserOutlined />} />
            <span style={{ color: token.colorTextSecondary, fontSize: '14px', fontWeight: 500 }} className="desktop-only">
              {user?.username}
            </span>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
};
