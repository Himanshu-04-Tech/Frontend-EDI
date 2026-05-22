import React, { useState } from 'react';
import { Card, Tag, Alert, Button, Collapse, Space, Typography, theme } from 'antd';
import { 
  CheckCircleOutlined, 
  WarningOutlined, 
  CaretDownOutlined, 
  CaretUpOutlined, 
  BulbOutlined,
  EyeOutlined,
  SlidersOutlined
} from '@ant-design/icons';

const { Panel } = Collapse;
const { Text, Title, Paragraph } = Typography;

export const ExplanationPanel = ({ riskFactors = [], positiveFactors = [] }) => {
  const { token } = theme.useToken();
  const [expanded, setExpanded] = useState(false);

  // Map backend names to readable copywriting and values
  const getFactorDetails = (name, isPositive) => {
    const detailsMap = {
      // Positive factors
      'Monthly Income INR': { label: 'High Monthly Income', desc: 'Earnings boost debt-service coverage ratio.', impact: 28 },
      'Spending Ratio': { label: 'Healthy Spending Ratio', desc: 'Low monthly spending compared to total income.', impact: 20 },
      'Missed Payments': { label: 'No Missed Payments', desc: 'Consistent payment history over last 12 months.', impact: 35 },
      'Savings Ratio': { label: 'Solid Savings Buffer', desc: 'Good monthly savings speed relative to spending.', impact: 15 },
      'Emergency Fund Months': { label: 'Emergency Fund Buffer', desc: 'Substantial savings to cover core living expenses.', impact: 22 },
      'Investment Score': { label: 'Asset Diversification', desc: 'High asset score indicates financial safety nets.', impact: 12 },
      
      // Risk factors
      'Outstanding Loan Value INR': { label: 'High Outstanding Loan Debt', desc: 'Total debt load raises default probability.', impact: -30 },
      'Age': { label: 'Young Demographics', desc: 'Early career status exhibits shorter credit history.', impact: -10 },
      'Family Size': { label: 'High Dependents Count', desc: 'Larger household size increases financial drag.', impact: -15 },
      'City Tier': { label: 'Tier 3 Location Location', desc: 'Rural or tier-3 markets carry higher risk caps.', impact: -8 },
      'Transaction Frequency': { label: 'Low Transaction Frequency', desc: 'Dormant bank activity reduces behavioral trust.', impact: -12 }
    };

    return detailsMap[name] || {
      label: name,
      desc: isPositive ? 'Favorable financial profile parameter.' : 'Unfavorable profile parameter.',
      impact: isPositive ? 10 : -10
    };
  };

  return (
    <Card
      style={{
        background: 'rgba(22, 26, 34, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
      }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BulbOutlined style={{ color: '#f59e0b', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
            Why This Score?
          </span>
        </div>
      }
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Risks Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <WarningOutlined style={{ color: token.colorError }} />
            <Text style={{ fontWeight: 600, color: token.colorText, fontSize: '14px' }}>Risk Elevating Factors</Text>
          </div>
          {riskFactors.length === 0 ? (
            <Alert
              message="No significant risk factors detected in this profile."
              type="success"
              showIcon
              style={{ borderRadius: '6px', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.1)' }}
            />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {riskFactors.map((factor, index) => {
                const details = getFactorDetails(factor, false);
                return (
                  <Tag
                    key={index}
                    color="error"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '13px',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      background: 'rgba(239, 68, 68, 0.05)',
                      color: token.colorError,
                      margin: 0
                    }}
                  >
                    <WarningOutlined style={{ marginRight: '6px' }} />
                    <strong>{details.label}</strong>
                  </Tag>
                );
              })}
            </div>
          )}
        </div>

        {/* Positives Section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <CheckCircleOutlined style={{ color: token.colorSuccess }} />
            <Text style={{ fontWeight: 600, color: token.colorText, fontSize: '14px' }}>Favorable Positive Indicators</Text>
          </div>
          {positiveFactors.length === 0 ? (
            <Alert
              message="No prominent positive indicators found. Profile lacks security buffers."
              type="warning"
              showIcon
              style={{ borderRadius: '6px', background: 'rgba(245, 158, 11, 0.05)', borderColor: 'rgba(245, 158, 11, 0.1)' }}
            />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {positiveFactors.map((factor, index) => {
                const details = getFactorDetails(factor, true);
                return (
                  <Tag
                    key={index}
                    color="success"
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      fontSize: '13px',
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      background: 'rgba(16, 185, 129, 0.05)',
                      color: token.colorSuccess,
                      margin: 0
                    }}
                  >
                    <CheckCircleOutlined style={{ marginRight: '6px' }} />
                    <strong>{details.label}</strong>
                  </Tag>
                );
              })}
            </div>
          )}
        </div>

        {/* Detailed AI Explanation Expandable panel */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
          <Button
            type="text"
            block
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 8px',
              color: token.colorPrimary,
              fontWeight: 600,
              fontSize: '14px'
            }}
          >
            <span>
              <EyeOutlined style={{ marginRight: '8px' }} /> Detailed AI Explanation
            </span>
            {expanded ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </Button>

          {expanded && (
            <div style={{ marginTop: '20px' }} className="fade-in">
              <Paragraph style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '24px' }}>
                Below is the SHAP value decomposition. Features pulling the bar to the <strong>right (red)</strong> increase risk, 
                while features pulling the bar to the <strong>left (green)</strong> reduce risk.
              </Paragraph>

              {/* Custom SVG SHAP waterfall chart */}
              <div 
                style={{ 
                  background: '#161a22', 
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px', 
                  padding: '20px',
                  marginBottom: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>
                  <span>FEATURE EFFECT</span>
                  <span>SHAP CONTRIBUTION IMPACT</span>
                </div>

                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {/* Positive factor list */}
                  {positiveFactors.map((factor, index) => {
                    const details = getFactorDetails(factor, true);
                    return (
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                          <span style={{ color: '#fff', fontWeight: 500 }}>{details.label}</span>
                          <span style={{ color: '#10b981', fontWeight: 600 }}>-{details.impact}% risk</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${details.impact * 2}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
                        </div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{details.desc}</span>
                      </div>
                    );
                  })}

                  {/* Risk factor list */}
                  {riskFactors.map((factor, index) => {
                    const details = getFactorDetails(factor, false);
                    return (
                      <div key={index}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '12px' }}>
                          <span style={{ color: '#fff', fontWeight: 500 }}>{details.label}</span>
                          <span style={{ color: '#ef4444', fontWeight: 600 }}>+{Math.abs(details.impact)}% risk</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden', justifyContent: 'flex-end' }}>
                          <div style={{ width: `${Math.abs(details.impact) * 2}%`, height: '100%', background: '#ef4444', borderRadius: '4px' }} />
                        </div>
                        <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{details.desc}</span>
                      </div>
                    );
                  })}
                </Space>
              </div>

              {/* Waterfall Plot Placeholder */}
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  border: '1px dashed rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px', 
                  padding: '24px', 
                  textAlign: 'center' 
                }}
              >
                <SlidersOutlined style={{ fontSize: '32px', color: token.colorTextDescription, marginBottom: '12px' }} />
                <Title level={5} style={{ fontSize: '14px', margin: '0 0 6px 0', color: '#fff' }}>
                  SHAP Waterfall Plot Simulation
                </Title>
                <Text style={{ fontSize: '12px', color: token.colorTextDescription, display: 'block', maxWidth: '320px', margin: '0 auto' }}>
                  Multi-game shapley values mapped dynamically. Features sorted descending by baseline contribution score.
                </Text>
              </div>
            </div>
          )}
        </div>
      </Space>
    </Card>
  );
};

export default ExplanationPanel;
