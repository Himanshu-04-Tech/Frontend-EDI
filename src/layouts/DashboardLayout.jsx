import React, { useState } from 'react';
import { Layout, Spin, theme } from 'antd';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

const { Content } = Layout;

export const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const { token } = theme.useToken();

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#0b0c10',
        }}
      >
        <Spin size="large" tip="Loading AI session..." />
      </div>
    );
  }

  // Redirect to login page if unauthorized
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#0a0b0d' }}>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            margin: '24px',
            minHeight: 280,
            overflowY: 'auto',
          }}
        >
          <div className="fade-in">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
