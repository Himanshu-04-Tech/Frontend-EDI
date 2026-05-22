import React, { useState } from 'react';
import { Row, Col, Card, Empty, Alert, Button, Space, Typography, theme } from 'antd';
import { AreaChartOutlined, WarningOutlined, ReloadOutlined, ExperimentOutlined } from '@ant-design/icons';
import FinancialInputForm from '../components/FinancialInputForm';
import RiskScoreCard from '../components/RiskScoreCard';
import ExplanationPanel from '../components/ExplanationPanel';
import LoadingOverlay from '../components/LoadingOverlay';
import { predictCreditRisk } from '../services/api';
import { parsePredictionResponse, formatPayload } from '../utils/parser';

const { Title, Text, Paragraph } = Typography;

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastPayload, setLastPayload] = useState(null);
  const { token } = theme.useToken();

  const handleAnalyze = async (values) => {
    setLoading(true);
    setError(null);
    setLastPayload(values);

    const formattedPayload = formatPayload(values);

    try {
      // Direct call to live backend
      const rawData = await predictCreditRisk(formattedPayload);
      const parsedData = parsePredictionResponse(rawData);
      
      setResult(parsedData);
      setHasSearched(true);

      // Save to localStorage history
      const savedHistory = JSON.parse(localStorage.getItem('credit_risk_history') || '[]');
      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        inputs: values,
        ...parsedData
      };
      localStorage.setItem('credit_risk_history', JSON.stringify([newRecord, ...savedHistory]));
    } catch (err) {
      console.error(err);
      setError(err.message || 'API request failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastPayload) {
      handleAnalyze(lastPayload);
    }
  };

  const handleSimulateDemo = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Decoupled mock payload representing a realistic low-risk score
      const mockRaw = {
        risk_score: 23,
        risk_level: 'Low Risk',
        risk_factors: ['Savings Ratio', 'Outstanding Loan Value INR'],
        positive_factors: ['Monthly Income INR', 'Spending Ratio', 'Missed Payments']
      };
      const parsedData = parsePredictionResponse(mockRaw);
      setResult(parsedData);
      setHasSearched(true);
      setLoading(false);

      // Save mock to history ledger
      const savedHistory = JSON.parse(localStorage.getItem('credit_risk_history') || '[]');
      const newRecord = {
        id: Math.random().toString(36).substr(2, 9),
        inputs: lastPayload || {
          Age: 28,
          Family_Size: 4,
          City_Tier: 1,
          Employment_Type: 'Salaried',
          Monthly_Income_INR: 85000,
          Monthly_Spending_INR: 42000,
          Savings_Balance_INR: 300000,
          Outstanding_Loan_Value_INR: 450000,
          Transaction_Frequency: 120,
          Missed_Payments: 1,
          Investment_Score: 72,
          Emergency_Fund_Months: 6
        },
        ...parsedData
      };
      localStorage.setItem('credit_risk_history', JSON.stringify([newRecord, ...savedHistory]));
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Info */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, fontFamily: 'Outfit, sans-serif' }}>
          Credit Risk Analyzer
        </Title>
        <Text style={{ color: token.colorTextDescription }}>
          Conduct real-time explainable machine learning assessments on debtor balance sheets.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Input Form Column */}
        <Col xs={24} lg={12}>
          <FinancialInputForm onSubmit={handleAnalyze} loading={loading} />
        </Col>

        {/* Results Panel Column */}
        <Col xs={24} lg={12}>
          <div style={{ position: 'relative', height: '100%', minHeight: '500px' }}>
            {/* Loading Overlay */}
            {loading && <LoadingOverlay />}

            {/* Error State */}
            {error && !loading && (
              <Card
                className="glass-panel"
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '12px',
                  border: `1px solid ${token.colorError}33`,
                }}
              >
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <WarningOutlined style={{ fontSize: '48px', color: token.colorError, marginBottom: '16px' }} />
                  <Title level={4} style={{ color: token.colorError, margin: '0 0 12px 0' }}>
                    Prediction Failed
                  </Title>
                  <Paragraph style={{ color: token.colorTextSecondary, maxWidth: '400px', margin: '0 auto 24px auto', fontSize: '13px' }}>
                    {error}
                  </Paragraph>
                  <Space size="middle">
                    <Button 
                      type="primary" 
                      danger 
                      icon={<ReloadOutlined />} 
                      onClick={handleRetry}
                      style={{ borderRadius: '6px' }}
                    >
                      Retry Assessment
                    </Button>
                    <Button 
                      type="default" 
                      icon={<ExperimentOutlined />} 
                      onClick={handleSimulateDemo}
                      style={{ borderRadius: '6px', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      Use Demo Mock
                    </Button>
                  </Space>
                </div>
              </Card>
            )}

            {/* Empty State */}
            {!hasSearched && !error && !loading && (
              <Card
                style={{
                  height: '100%',
                  background: 'rgba(22, 26, 34, 0.3)',
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Empty
                  image={<AreaChartOutlined style={{ fontSize: '64px', color: '#6366f1', opacity: 0.3 }} />}
                  description={
                    <div>
                      <Text style={{ fontSize: '16px', fontWeight: 600, display: 'block', color: '#fff', marginBottom: '4px' }}>
                        Ready for Evaluation
                      </Text>
                      <Text style={{ fontSize: '13px', color: token.colorTextDescription }}>
                        Your AI risk analysis will appear here.
                      </Text>
                    </div>
                  }
                />
              </Card>
            )}

            {/* Success Results Pane */}
            {hasSearched && !error && !loading && result && (
              <Space direction="vertical" size="large" style={{ width: '100%' }} className="fade-in">
                <RiskScoreCard score={result.riskScore} level={result.riskLevel} />
                <ExplanationPanel riskFactors={result.riskFactors} positiveFactors={result.positiveFactors} />
              </Space>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
