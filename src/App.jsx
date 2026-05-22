import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { AuthProvider } from './hooks/useAuth';
import AppRoutes from './routes';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#6366f1',       // Indigo primary accent
          colorBgBase: '#0b0c10',        // Dark charcoal background
          colorBgContainer: '#161a22',   // Secondary container background
          colorBorder: 'rgba(255, 255, 255, 0.08)',
          colorBorderSecondary: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
          colorSuccess: '#10b981',       // Green for low risk
          colorWarning: '#f59e0b',       // Orange for moderate risk
          colorError: '#ef4444',         // Red for high risk
        },
        components: {
          Card: {
            colorBgContainer: 'rgba(22, 26, 34, 0.6)',
            boxShadowCard: '0 4px 20px rgba(0, 0, 0, 0.2)',
          },
          Table: {
            colorHeaderBg: 'rgba(255, 255, 255, 0.02)',
            colorHeaderColor: '#fff',
            colorBgContainer: 'transparent',
          },
          Slider: {
            handleColor: '#6366f1',
            trackColor: '#6366f1',
          }
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
