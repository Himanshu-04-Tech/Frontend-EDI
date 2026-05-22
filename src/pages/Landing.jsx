import React from 'react';
import { Layout, Row, Col, Button, Card, Space, Typography, theme } from 'antd';
import { 
  RocketOutlined, 
  EyeOutlined, 
  BarChartOutlined, 
  SafetyCertificateOutlined, 
  RightOutlined, 
  GithubOutlined, 
  TeamOutlined, 
  InfoCircleOutlined,
  CodeOutlined,
  NodeIndexOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

export const Landing = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '32px', color: '#6366f1' }} />,
      title: 'AI-Powered Risk Prediction',
      description: 'Leverage state-of-the-art Logistic Regression models trained on behavioral finance data to accurately project credit defaults.'
    },
    {
      icon: <EyeOutlined style={{ fontSize: '32px', color: '#10b981' }} />,
      title: 'Explainable Credit Decisions',
      description: 'Demystify black-box predictions. Get direct insights into the exact metrics that determined the credit risk score.'
    },
    {
      icon: <BarChartOutlined style={{ fontSize: '32px', color: '#f59e0b' }} />,
      title: 'Behavioral Financial Analysis',
      description: 'Go beyond historical scores. Look at spending ratios, emergency buffers, and saving speeds to analyze dynamic habits.'
    },
    {
      icon: <SafetyCertificateOutlined style={{ fontSize: '32px', color: '#ec4899' }} />,
      title: 'Transparent Risk Assessment',
      description: 'Built on trust. Every assessment outlines increase-risk and decrease-risk features to guarantee absolute compliance.'
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: '#0b0c10' }}>
      {/* Landing Navbar */}
      <Header
        style={{
          background: 'transparent',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 5%',
          height: '70px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SafetyCertificateOutlined style={{ fontSize: '28px', color: '#6366f1' }} />
          <span style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#fff' }}>
            CREDIT<span style={{ color: '#6366f1' }}>AI</span>
          </span>
        </div>
        <Button 
          type="primary" 
          onClick={() => navigate('/login')}
          style={{ 
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            border: 'none',
            fontWeight: 600,
            borderRadius: '6px'
          }}
        >
          Sign In
        </Button>
      </Header>

      <Content style={{ padding: '0 5%' }}>
        {/* Hero Section */}
        <div 
          style={{ 
            textAlign: 'center', 
            padding: '100px 0 80px 0', 
            maxWidth: '900px', 
            margin: '0 auto' 
          }}
          className="fade-in"
        >
          <div 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              background: 'rgba(99, 102, 241, 0.1)', 
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '20px',
              padding: '4px 16px',
              marginBottom: '24px'
            }}
          >
            <CodeOutlined style={{ color: '#a5b4fc', fontSize: '12px' }} />
            <Text style={{ color: '#a5b4fc', fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px' }}>
              POWERED BY SHAP EXPLAINABILITY
            </Text>
          </div>

          <Title 
            level={1} 
            style={{ 
              fontSize: '56px', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              letterSpacing: '-1px',
              margin: '0 0 24px 0',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Explainable AI <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #a5b4fc 30%, #6366f1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Credit Risk Assessment
            </span>
          </Title>

          <Paragraph 
            style={{ 
              color: '#94a3b8', 
              fontSize: '18px', 
              maxWidth: '650px', 
              margin: '0 auto 40px auto',
              lineHeight: 1.6
            }}
          >
            Behavioral finance powered credit analysis using machine learning and explainable AI.
            Get transparent credit insights instantly.
          </Paragraph>

          <Space size="middle">
            <Button 
              type="primary" 
              size="large" 
              onClick={() => navigate('/dashboard')}
              style={{ 
                height: '52px',
                padding: '0 32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
              }}
            >
              Get Started <RightOutlined style={{ fontSize: '12px' }} />
            </Button>
            <Button 
              type="default" 
              ghost
              size="large" 
              onClick={() => navigate('/dashboard')}
              style={{ 
                height: '52px',
                padding: '0 32px',
                borderRadius: '8px',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#f8fafc',
                fontWeight: 600
              }}
            >
              Analyze Risk
            </Button>
          </Space>
        </div>

        {/* Feature Cards Grid */}
        <div style={{ padding: '60px 0 100px 0' }}>
          <Row gutter={[24, 24]}>
            {features.map((feature, idx) => (
              <Col xs={24} sm={12} lg={6} key={idx}>
                <Card
                  hoverable
                  style={{
                    background: 'rgba(22, 26, 34, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    height: '100%',
                    padding: '8px'
                  }}
                  bodyStyle={{ padding: '24px' }}
                >
                  <div style={{ marginBottom: '20px' }}>{feature.icon}</div>
                  <Title level={4} style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#94a3b8', fontSize: '14px', margin: 0, lineHeight: 1.5 }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Architecture Section */}
        <div 
          style={{ 
            background: 'rgba(22, 26, 34, 0.3)', 
            border: '1px solid rgba(255, 255, 255, 0.03)',
            borderRadius: '16px',
            padding: '50px 40px',
            marginBottom: '100px',
            textAlign: 'center'
          }}
        >
          <Title level={2} style={{ fontSize: '28px', fontWeight: 700, marginBottom: '40px', fontFamily: 'Outfit, sans-serif' }}>
            Interactive Architecture Flow
          </Title>

          <Row justify="center" align="middle" gutter={[16, 24]}>
            {/* React Frontend */}
            <Col xs={24} md={5}>
              <div 
                style={{ 
                  background: 'rgba(99, 102, 241, 0.1)', 
                  border: '1px solid #6366f1',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  color: '#fff',
                  fontWeight: 600
                }}
                className="pulse-node"
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚛️</div>
                <Text style={{ color: '#fff', fontWeight: 700, display: 'block' }}>React Frontend</Text>
                <Text style={{ color: '#94a3b8', fontSize: '12px' }}>Vite & Ant Design</Text>
              </div>
            </Col>

            {/* Arrow 1 */}
            <Col xs={24} md={1}>
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563', transform: 'rotate(90deg) scale(0.8)' }} className="mobile-only" />
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563' }} className="desktop-only" />
            </Col>

            {/* FastAPI Gateway */}
            <Col xs={24} md={5}>
              <div 
                style={{ 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  border: '1px solid #10b981',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
                <Text style={{ color: '#fff', fontWeight: 700, display: 'block' }}>FastAPI Gateway</Text>
                <Text style={{ color: '#94a3b8', fontSize: '12px' }}>REST API Services</Text>
              </div>
            </Col>

            {/* Arrow 2 */}
            <Col xs={24} md={1}>
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563', transform: 'rotate(90deg) scale(0.8)' }} className="mobile-only" />
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563' }} className="desktop-only" />
            </Col>

            {/* ML Model */}
            <Col xs={24} md={5}>
              <div 
                style={{ 
                  background: 'rgba(245, 158, 11, 0.1)', 
                  border: '1px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🤖</div>
                <Text style={{ color: '#fff', fontWeight: 700, display: 'block' }}>ML Prediction Model</Text>
                <Text style={{ color: '#94a3b8', fontSize: '12px' }}>Logistic Regression</Text>
              </div>
            </Col>

            {/* Arrow 3 */}
            <Col xs={24} md={1}>
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563', transform: 'rotate(90deg) scale(0.8)' }} className="mobile-only" />
              <RightOutlined style={{ fontSize: '20px', color: '#4b5563' }} className="desktop-only" />
            </Col>

            {/* SHAP Explainability */}
            <Col xs={24} md={5}>
              <div 
                style={{ 
                  background: 'rgba(236, 72, 153, 0.1)', 
                  border: '1px solid #ec4899',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🧠</div>
                <Text style={{ color: '#fff', fontWeight: 700, display: 'block' }}>SHAP Explainability</Text>
                <Text style={{ color: '#94a3b8', fontSize: '12px' }}>Feature Importance Graph</Text>
              </div>
            </Col>
          </Row>
        </div>
      </Content>

      {/* Footer */}
      <Footer 
        style={{ 
          background: '#07080a', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
          padding: '40px 50px',
          color: '#64748b'
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <SafetyCertificateOutlined style={{ fontSize: '22px', color: '#6366f1' }} />
              <span style={{ fontSize: '16px', fontWeight: 800, fontFamily: 'Outfit, sans-serif', color: '#fff' }}>
                CREDIT<span style={{ color: '#6366f1' }}>AI</span>
              </span>
            </div>
            <Paragraph style={{ color: '#64748b', maxWidth: '380px', fontSize: '13px' }}>
              A state-of-the-art behavioral finance credit assessment platform. We leverage predictive logistic models 
              paired with explainable game theory to justify risk parameters with total transparency.
            </Paragraph>
          </Col>

          <Col xs={12} md={6}>
            <Text style={{ color: '#fff', fontWeight: 600, display: 'block', marginBottom: '16px' }}>Project Info</Text>
            <Space direction="vertical" size="small" style={{ fontSize: '13px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <InfoCircleOutlined /> Project Overview
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TeamOutlined /> Team Placeholder
              </span>
            </Space>
          </Col>

          <Col xs={12} md={6}>
            <Text style={{ color: '#fff', fontWeight: 600, display: 'block', marginBottom: '16px' }}>Resources</Text>
            <Space direction="vertical" size="small" style={{ fontSize: '13px' }}>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <GithubOutlined /> GitHub Repository
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <NodeIndexOutlined /> API Docs (Redoc/Swagger)
              </span>
            </Space>
          </Col>
        </Row>
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.03)', marginTop: '30px', paddingTop: '20px', textAlign: 'center', fontSize: '12px' }}>
          &copy; {new Date().getFullYear()} Credit AI. Structured for fastapi integration.
        </div>
      </Footer>
    </Layout>
  );
};

export default Landing;
