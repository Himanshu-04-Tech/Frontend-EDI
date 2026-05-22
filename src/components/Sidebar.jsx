import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { DashboardOutlined, HistoryOutlined, HomeOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

export const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home Page',
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Main Dashboard',
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: 'Analysis History',
    },
  ];

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      width={260}
      style={{
        background: '#161a22',
        borderRight: `1px solid ${token.colorBorderSecondary}`,
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: '0 24px',
          gap: '12px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
        }}
      >
        <SafetyCertificateOutlined style={{ fontSize: '24px', color: token.colorPrimary }} />
        {!collapsed && (
          <span
            style={{
              fontSize: '16px',
              fontWeight: '700',
              fontFamily: 'Outfit, sans-serif',
              color: '#fff',
              letterSpacing: '0.5px',
            }}
          >
            CREDIT<span style={{ color: token.colorPrimary }}>AI</span>
          </span>
        )}
      </div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={handleMenuClick}
        items={menuItems}
        style={{
          background: 'transparent',
          padding: '16px 8px',
          borderRight: 0,
        }}
      />
    </Sider>
  );
};
