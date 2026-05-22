import React from 'react';
import { Table, Tag, Button, Space, Typography, theme } from 'antd';
import { InfoCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const RiskHistoryTable = ({ data = [], onViewDetails }) => {
  const { token } = theme.useToken();

  const getRiskLevelTag = (level) => {
    switch (level) {
      case 'Low Risk':
        return <Tag color="success" style={{ fontWeight: 600 }}>LOW RISK</Tag>;
      case 'Moderate Risk':
        return <Tag color="warning" style={{ fontWeight: 600 }}>MODERATE RISK</Tag>;
      case 'High Risk':
        return <Tag color="error" style={{ fontWeight: 600 }}>HIGH RISK</Tag>;
      default:
        return <Tag color="default">{level}</Tag>;
    }
  };

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => new Date(text).toLocaleString(),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
      defaultSortOrder: 'descend'
    },
    {
      title: 'Debtor Account',
      dataIndex: 'inputs',
      key: 'username',
      render: (inputs) => `Profile (Age: ${inputs?.Age || 'N/A'}, ${inputs?.Employment_Type || 'N/A'})`
    },
    {
      title: 'Risk Score',
      dataIndex: 'riskScore',
      key: 'riskScore',
      render: (score) => (
        <span style={{ fontWeight: 700, color: score > 60 ? token.colorError : score > 30 ? token.colorWarning : token.colorSuccess }}>
          {score} / 100
        </span>
      ),
      sorter: (a, b) => a.riskScore - b.riskScore,
    },
    {
      title: 'Risk Level',
      dataIndex: 'riskLevel',
      key: 'riskLevel',
      render: (level) => getRiskLevelTag(level),
      filters: [
        { text: 'Low Risk', value: 'Low Risk' },
        { text: 'Moderate Risk', value: 'Moderate Risk' },
        { text: 'High Risk', value: 'High Risk' },
      ],
      onFilter: (value, record) => record.riskLevel === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onViewDetails(record)}
          style={{ color: token.colorPrimary }}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      style={{
        background: 'transparent',
      }}
      className="history-table"
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.01)', borderRadius: '6px' }}>
            <Text strong style={{ color: '#fff', fontSize: '13px', display: 'block', marginBottom: '8px' }}>
              Raw Profile Inputs:
            </Text>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <div><strong>Age:</strong> {record.inputs?.Age}</div>
              <div><strong>Family Size:</strong> {record.inputs?.Family_Size}</div>
              <div><strong>Employment Type:</strong> {record.inputs?.Employment_Type}</div>
              <div><strong>City Tier:</strong> Tier {record.inputs?.City_Tier}</div>
              <div><strong>Monthly Income:</strong> ₹{record.inputs?.Monthly_Income_INR?.toLocaleString()}</div>
              <div><strong>Monthly Spending:</strong> ₹{record.inputs?.Monthly_Spending_INR?.toLocaleString()}</div>
              <div><strong>Savings Balance:</strong> ₹{record.inputs?.Savings_Balance_INR?.toLocaleString()}</div>
              <div><strong>Outstanding Loans:</strong> ₹{record.inputs?.Outstanding_Loan_Value_INR?.toLocaleString()}</div>
              <div><strong>Investment Score:</strong> {record.inputs?.Investment_Score}</div>
              <div><strong>Emergency Buffer:</strong> {record.inputs?.Emergency_Fund_Months} months</div>
            </div>
          </div>
        ),
        rowExpandable: () => true,
      }}
    />
  );
};

export default RiskHistoryTable;
