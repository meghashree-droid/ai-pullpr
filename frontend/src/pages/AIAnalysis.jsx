import React, { useState, useEffect } from 'react';
import { Typography, Steps, Button, Space, Tag, Spin } from 'antd';
import { 
  RobotOutlined, 
  CodeOutlined, 
  BugOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  PullRequestOutlined,
  LoadingOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const AIAnalysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const issue = location.state?.issue || {
    id: '1', title: 'Example Issue: Authentication Failure', repo: 'unknown-repo', number: 404
  };

  const [currentStep, setCurrentStep] = useState(0);
  
  // Simulate AI Pipeline Execution
  useEffect(() => {
    if (currentStep < 2) { // Auto-progress up to step 2 (Code Generation readiness)
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const steps = [
    {
      title: 'Issue Interpretation',
      description: 'Understanding problem statements and constraints.',
      icon: currentStep === 0 ? <LoadingOutlined /> : (currentStep > 0 ? <CheckCircleOutlined /> : <RobotOutlined />),
    },
    {
      title: 'Codebase Analysis',
      description: 'Locating relevant files through vector search.',
      icon: currentStep === 1 ? <LoadingOutlined /> : (currentStep > 1 ? <CheckCircleOutlined /> : <SearchOutlined />),
    },
    {
      title: 'Code Generation',
      description: 'Synthesizing bug fixes & feature logic.',
      icon: currentStep === 2 ? <LoadingOutlined /> : (currentStep > 2 ? <CheckCircleOutlined /> : <CodeOutlined />),
    },
    {
      title: 'AI Code Review',
      description: 'Executing static analysis on generated patches.',
      icon: currentStep === 3 ? <LoadingOutlined /> : (currentStep > 3 ? <CheckCircleOutlined /> : <BugOutlined />),
    },
    {
      title: 'Pull Request Creation',
      description: 'Pushing branches and opening GitHub PRs.',
      icon: currentStep === 4 ? <LoadingOutlined /> : (currentStep > 4 ? <CheckCircleOutlined /> : <PullRequestOutlined />),
    }
  ];

  const getStepContent = () => {
    switch(currentStep) {
      case 0:
        return (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 36, color: '#6366f1' }} spin />} />
            <Title level={4} style={{ color: '#fff', marginTop: 24 }}>Analyzing Issue Context...</Title>
            <Text type="secondary">The AI is currently parsing issue #{issue.number}: "{issue.title}"</Text>
          </div>
        );
      case 1:
        return (
          <div style={{ padding: '24px 0' }}>
            <Title level={4} style={{ color: '#fff' }}><CheckCircleOutlined style={{ color: '#10b981', marginRight: 8 }}/> Context Established</Title>
            <Text type="secondary">The AI is now scanning the following repository for dependencies:</Text>
            
            <GlassCard size="small" style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#a855f7' }} spin />} />
                <div>
                  <Text strong style={{ color: '#fff', display: 'block' }}>Searching {issue.repo} codebase...</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>Building abstract syntax trees and graphing dependencies.</Text>
                </div>
              </div>
            </GlassCard>
            
            <Space direction="vertical" style={{ width: '100%', marginTop: 24 }}>
              <Text style={{ color: '#fff' }}>Identified target files:</Text>
              <Tag color="blue">src/services/api.js</Tag>
              <Tag color="purple">src/components/List.jsx</Tag>
            </Space>
          </div>
        );
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <div style={{ padding: '24px 0' }}>
            <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <div style={{ flex: 1 }}>
                <Title level={4} style={{ color: '#fff', margin: 0 }}>
                  <CheckCircleOutlined style={{ color: '#10b981', marginRight: 8 }}/> 
                  Analysis Complete
                </Title>
                <div style={{ marginTop: 16 }}>
                  <Paragraph style={{ color: 'var(--text-secondary)' }}>
                    The AI has successfully mapped the issue constraints to the identified codebase files and synthesized a comprehensive patch.
                  </Paragraph>
                  <Paragraph style={{ color: 'var(--text-secondary)' }}>
                    Generating solutions for <Tag color="default">#{issue.number}</Tag> in <Tag color="blue">{issue.repo}</Tag>.
                  </Paragraph>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '24px' }}>
              <Button 
                type="primary" 
                icon={<ArrowRightOutlined />} 
                onClick={() => navigate('/code-generation')}
                style={{ 
                  background: 'linear-gradient(90deg, #ec4899 0%, #6366f1 100%)',
                  border: 'none',
                  padding: '0 24px',
                  height: '44px',
                  fontSize: '16px'
                }}
                className="neon-text"
              >
                Review Generated Code
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="analysis-container">
      <div style={{ marginBottom: 32 }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate(-1)}
          style={{ color: 'var(--text-secondary)', padding: '0 0 8px 0' }}
        >
          Back to Issues
        </Button>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>AI Automation Pipeline</Title>
        <Text style={{ color: 'var(--text-secondary)' }}>
          Real-time visualization of the automated issue resolution flow.
        </Text>
      </div>

      <GlassCard style={{ marginBottom: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BugOutlined style={{ fontSize: '24px', color: '#ec4899' }} />
            <Title level={4} style={{ color: '#fff', margin: 0, wordBreak: 'break-word' }}>{issue.title}</Title>
          </div>
          <Space>
            <Tag color="purple">{issue.repo}</Tag>
            <Tag color="blue">issue #{issue.number || issue.id}</Tag>
          </Space>
        </Space>
      </GlassCard>

      <GlassCard>
        <Steps 
          current={currentStep} 
          items={steps.map(s => ({
            ...s,
            description: <span style={{ color: 'rgba(255,255,255,0.45)' }}>{s.description}</span>,
            title: <span style={{ color: '#fff' }}>{s.title}</span>
          }))}
          style={{ marginBottom: 40 }}
        />
        
        <div style={{ 
          minHeight: '280px', 
          border: '1px solid rgba(255, 255, 255, 0.1)', 
          borderRadius: '12px',
          padding: '24px',
          background: 'rgba(0, 0, 0, 0.2)'
        }}>
          {getStepContent()}
        </div>
      </GlassCard>
    </div>
  );
};

export default AIAnalysis;
