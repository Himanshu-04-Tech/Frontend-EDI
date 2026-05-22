import React, { useState, useEffect } from 'react';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const LoadingOverlay = () => {
  const [step, setStep] = useState(0);
  const loadingSteps = [
    'Connecting to FastAPI service gateway...',
    'Serializing credit features vector...',
    'Running Logistic Regression prediction model...',
    'Computing SHAP gamified feature contributions...',
    'Compiling behavioral risk insights...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const antIcon = <LoadingOutlined style={{ fontSize: 48, color: '#6366f1' }} spin />;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(11, 12, 16, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        textAlign: 'center',
        padding: '24px'
      }}
      className="fade-in"
    >
      <Spin indicator={antIcon} />
      
      <div style={{ marginTop: '24px' }}>
        <Text 
          style={{ 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#fff', 
            display: 'block',
            fontFamily: 'Outfit, sans-serif'
          }}
        >
          Analyzing Credit Profile
        </Text>
        <Text 
          style={{ 
            fontSize: '13px', 
            color: '#94a3b8', 
            display: 'block', 
            marginTop: '8px',
            minHeight: '20px',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {loadingSteps[step]}
        </Text>
      </div>
    </div>
  );
};

export default LoadingOverlay;
