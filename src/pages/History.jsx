import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Space, Typography, Popconfirm, Empty, Row, Col, theme } from 'antd';
import { HistoryOutlined, DeleteOutlined, LineChartOutlined, FileSearchOutlined } from '@ant-design/icons';
import RiskHistoryTable from '../components/RiskHistoryTable';
import RiskTrendChart from '../components/RiskTrendChart';
import ExplanationPanel from '../components/ExplanationPanel';

const { Title, Text, Paragraph } = Typography;

export const History = () => {
  const [history, setHistory] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { token } = theme.useToken();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('credit_risk_history') || '[]');
    setHistory(saved);
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('credit_risk_history');
    setHistory([]);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0, fontFamily: 'Outfit, sans-serif' }}>
            Analysis Ledger
          </Title>
          <Text style={{ color: token.colorTextDescription }}>
            Review past machine learning evaluations and score trend indexes.
          </Text>
        </div>
        
        {history.length > 0 && (
          <Popconfirm
            title="Clear all records?"
            description="This action cannot be undone. Are you sure?"
            onConfirm={handleClearHistory}
            okText="Clear Ledger"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
          >
            <Button type="default" danger icon={<DeleteOutlined />} style={{ borderRadius: '6px' }}>
              Clear History
            </Button>
          </Popconfirm>
        )}
      </div>

      {history.length === 0 ? (
        <Card
          style={{
            background: 'rgba(22, 26, 34, 0.3)',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            textAlign: 'center',
            padding: '50px 0',
          }}
        >
          <Empty
            image={<HistoryOutlined style={{ fontSize: '48px', color: token.colorPrimary, opacity: 0.3 }} />}
            description={
              <div>
                <Text style={{ fontSize: '15px', fontWeight: 600, display: 'block', color: '#fff', marginBottom: '4px' }}>
                  Ledger Empty
                </Text>
                <Text style={{ fontSize: '13px', color: token.colorTextDescription }}>
                  Perform credit evaluations in the Main Dashboard to record history.
                </Text>
              </div>
            }
          />
        </Card>
      ) : (
        <Row gutter={[24, 24]}>
          {/* Trend Chart */}
          <Col xs={24}>
            <Card
              style={{
                background: 'rgba(22, 26, 34, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
              }}
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LineChartOutlined style={{ color: '#6366f1' }} />
                  <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Credit Risk Index Trend</span>
                </div>
              }
            >
              <RiskTrendChart data={history} />
            </Card>
          </Col>

          {/* History Table */}
          <Col xs={24}>
            <Card
              style={{
                background: 'rgba(22, 26, 34, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
              }}
              bodyStyle={{ padding: '0px' }}
            >
              <RiskHistoryTable data={history} onViewDetails={handleViewDetails} />
            </Card>
          </Col>
        </Row>
      )}

      {/* Details Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff' }}>
            <FileSearchOutlined style={{ color: token.colorPrimary }} />
            <span style={{ fontFamily: 'Outfit, sans-serif' }}>AI Assessment File</span>
          </div>
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={650}
        destroyOnClose
        styles={{
          mask: {
            backdropFilter: 'blur(4px)',
            background: 'rgba(7, 8, 10, 0.6)',
          },
        }}
      >
        {selectedRecord && (
          <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#161a22', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>EVALUATION TIMESTAMP</span>
                <span style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{new Date(selectedRecord.timestamp).toLocaleString()}</span>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '11px', display: 'block' }}>CREDIT RISK RESULT</span>
                <span 
                  style={{ 
                    fontSize: '13px', 
                    fontWeight: 700, 
                    color: selectedRecord.riskScore > 60 ? token.colorError : selectedRecord.riskScore > 30 ? token.colorWarning : token.colorSuccess
                  }}
                >
                  {selectedRecord.riskLevel} ({selectedRecord.riskScore}/100)
                </span>
              </div>
            </div>

            <ExplanationPanel 
              riskFactors={selectedRecord.riskFactors} 
              positiveFactors={selectedRecord.positiveFactors} 
            />
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default History;
