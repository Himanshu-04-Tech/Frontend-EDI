import React from 'react';
import { Card, Typography, theme } from 'antd';
import RiskGauge from './RiskGauge';

const { Text } = Typography;

export const RiskScoreCard = ({ score, level }) => {
  const { token } = theme.useToken();

  const getDescription = (lvl) => {
    switch (lvl) {
      case 'Low Risk':
        return 'Your financial indicators show strong liquidity and low risk of default. Suitable for prime credit rates.';
      case 'Moderate Risk':
        return 'Minor indicators of vulnerability. Your credit worthiness is acceptable, though pricing adjustments may apply.';
      case 'High Risk':
        return 'Vulnerabilities detected. Outstanding balances, high spending ratio, or missed payments elevate risk profile.';
      default:
        return 'Evaluation completed successfully.';
    }
  };

  return (
    <Card
      style={{
        background: 'rgba(22, 26, 34, 0.4)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        textAlign: 'center',
      }}
    >
      <RiskGauge score={score} level={level} />
      
      <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
        <Text style={{ display: 'block', color: '#94a3b8', fontSize: '13px', lineHeight: '1.5' }}>
          {getDescription(level)}
        </Text>
      </div>
    </Card>
  );
};

export default RiskScoreCard;
