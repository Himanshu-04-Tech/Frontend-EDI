import React from 'react';
import { Form, InputNumber, Select, Slider, Tooltip, Card, Button, Row, Col, Space, Divider, Typography } from 'antd';
import { InfoCircleOutlined, CalculatorOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

export const FinancialInputForm = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  // Helper values for syncing Slider + InputNumber
  const initialValues = {
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
  };

  const handleFinish = (values) => {
    onSubmit(values);
  };

  // Indian Rupee Formatter
  const rupeeFormatter = (value) => {
    if (!value) return '₹ 0';
    return `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const rupeeParser = (value) => {
    return value.replace(/\₹\s?|(,*)/g, '');
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
          <CalculatorOutlined style={{ color: '#6366f1', fontSize: '20px' }} />
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'Outfit, sans-serif' }}>
            Financial Profile
          </span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={handleFinish}
        requiredMark={false}
        size="middle"
      >
        <Divider orientation="left" style={{ margin: '0 0 20px 0', borderColor: 'rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>DEMOGRAPHICS & WORK</span>
        </Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Age</span>
                  <Tooltip title="Demographic factor affecting scoring stability. Age displays credit maturity.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Age"
              rules={[{ required: true, message: 'Age is required' }]}
            >
              <InputNumber min={18} max={100} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Family Size</span>
                  <Tooltip title="Number of dependents in the household. Affects per-capita expense ratio.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Family_Size"
              rules={[{ required: true, message: 'Family size is required' }]}
            >
              <InputNumber min={1} max={15} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>City Tier</span>
                  <Tooltip title="Tier class of active city. Tier 1 = Metros (higher cost of living/salary).">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="City_Tier"
              rules={[{ required: true, message: 'City tier is required' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value={1}>Tier 1 (Metro)</Option>
                <Option value={2}>Tier 2 (Semi-Metro)</Option>
                <Option value={3}>Tier 3 (Rural/Urban-Town)</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Employment Type</span>
                  <Tooltip title="Employment status influences stability weightings inside the credit assessment logic.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Employment_Type"
              rules={[{ required: true, message: 'Employment is required' }]}
            >
              <Select style={{ width: '100%' }}>
                <Option value="Salaried">Salaried Employee</Option>
                <Option value="Self-Employed">Self-Employed</Option>
                <Option value="Business">Business Owner</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" style={{ margin: '10px 0 20px 0', borderColor: 'rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>MONTHLY BALANCE SHEET (INR)</span>
        </Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Monthly Income</span>
                  <Tooltip title="Total salary or business earnings post-tax. Baseline parameter of debt servicing.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Monthly_Income_INR"
              rules={[{ required: true, message: 'Monthly Income is required' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={rupeeFormatter}
                parser={rupeeParser}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Monthly Spending</span>
                  <Tooltip title="Total monthly expenses including rent, grocery, transport, utility bills.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Monthly_Spending_INR"
              rules={[
                { required: true, message: 'Monthly Spending is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value < getFieldValue('Monthly_Income_INR')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Spending cannot exceed total monthly income!'));
                  },
                }),
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={rupeeFormatter}
                parser={rupeeParser}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Savings Balance</span>
                  <Tooltip title="Active liquid savings inside accounts. Serves as collateral security.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Savings_Balance_INR"
              rules={[{ required: true, message: 'Savings is required' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={rupeeFormatter}
                parser={rupeeParser}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Outstanding Loan Value</span>
                  <Tooltip title="Accumulated amount left on all active credit cards, auto, and home loans.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Outstanding_Loan_Value_INR"
              rules={[{ required: true, message: 'Outstanding loan value is required' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={rupeeFormatter}
                parser={rupeeParser}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left" style={{ margin: '10px 0 20px 0', borderColor: 'rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>BEHAVIORAL INDEXES</span>
        </Divider>

        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Transaction Frequency</span>
                  <Tooltip title="Number of digital or bank transactions per month. Reflects account activity.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Transaction_Frequency"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber min={0} max={1000} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label={
                <Space>
                  <span>Missed Payments (Last 12m)</span>
                  <Tooltip title="Number of due payments/EMI missed in the previous 12 months. Affects score heavily.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Missed_Payments"
              rules={[{ required: true, message: 'Required' }]}
            >
              <InputNumber min={0} max={50} style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={
                <Space>
                  <span>Investment Score</span>
                  <Tooltip title="Calculated score based on asset diversity (mutual funds, gold, fixed deposits).">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Investment_Score"
              rules={[{ required: true, message: 'Required' }]}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Slider min={0} max={100} style={{ flexGrow: 1 }} />
                <Form.Item name="Investment_Score" noStyle>
                  <InputNumber min={0} max={100} style={{ width: '70px' }} />
                </Form.Item>
              </div>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={
                <Space>
                  <span>Emergency Fund (Months)</span>
                  <Tooltip title="Number of months of baseline expenses covered by current liquid deposits.">
                    <InfoCircleOutlined style={{ color: '#64748b' }} />
                  </Tooltip>
                </Space>
              }
              name="Emergency_Fund_Months"
              rules={[{ required: true, message: 'Required' }]}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Slider min={0} max={36} style={{ flexGrow: 1 }} />
                <Form.Item name="Emergency_Fund_Months" noStyle>
                  <InputNumber min={0} max={36} style={{ width: '70px' }} />
                </Form.Item>
              </div>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ margin: '16px 0 0 0' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            block
            size="large"
            style={{
              height: '48px',
              borderRadius: '6px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.2)'
            }}
          >
            {loading ? 'Evaluating Credit Profile...' : 'Analyze Credit Risk'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FinancialInputForm;
