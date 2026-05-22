import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Checkbox, Button, Alert, message, theme, Typography } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;


export const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const handleTabChange = (key) => {
    setActiveTab(key);
    setErrorMsg('');
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (activeTab === 'login') {
        await login(values.username, values.password, values.remember);
        message.success('Logged in successfully!');
        navigate('/dashboard');
      } else {
        if (values.password !== values.confirmPassword) {
          setErrorMsg('Passwords do not match.');
          setLoading(false);
          return;
        }
        await register(values.username, values.password);
        message.success('Registration successful! Please login.');
        setActiveTab('login');
        form.resetFields();
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#0b0c10',
        padding: '24px',
      }}
    >
      {/* Brand Header */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          marginBottom: '32px',
          cursor: 'pointer' 
        }}
        onClick={() => navigate('/')}
      >
        <SafetyCertificateOutlined style={{ fontSize: '32px', color: token.colorPrimary }} />
        <span style={{ fontSize: '24px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#fff' }}>
          CREDIT<span style={{ color: token.colorPrimary }}>AI</span>
        </span>
      </div>

      <Card
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        }}
        bodyStyle={{ padding: '36px 30px' }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          centered
          items={[
            { key: 'login', label: 'Sign In' },
            { key: 'register', label: 'Create Account' },
          ]}
          style={{ marginBottom: '24px' }}
        />

        {errorMsg && (
          <Alert
            message={errorMsg}
            type="error"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '6px' }}
          />
        )}

        <Form
          form={form}
          name="auth_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
          requiredMark={false}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your Username!' },
              { min: 3, message: 'Username must be at least 3 characters.' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: token.colorTextDescription }} />}
              placeholder="Username"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Password must be at least 6 characters.' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
              placeholder="Password"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          {activeTab === 'register' && (
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your Password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: token.colorTextDescription }} />}
                placeholder="Confirm Password"
                style={{ borderRadius: '6px' }}
              />
            </Form.Item>
          )}

          {activeTab === 'login' && (
            <Form.Item name="remember" valuePropName="checked" style={{ marginBottom: '16px' }}>
              <Checkbox style={{ color: token.colorTextSecondary }}>Remember me</Checkbox>
            </Form.Item>
          )}

          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                borderRadius: '6px',
                height: '46px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
              }}
            >
              {activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
      
      <Text style={{ marginTop: '24px', color: token.colorTextDescription, fontSize: '13px' }}>
        Demo Credentials: Admin / admin123
      </Text>
    </div>
  );
};

export default Auth;
