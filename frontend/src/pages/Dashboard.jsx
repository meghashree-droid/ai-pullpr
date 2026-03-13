import React from 'react';
import { Row, Col, Statistic, Typography } from 'antd';
import {
  BugOutlined,
  CheckCircleOutlined,
  PullRequestOutlined,
  ExperimentOutlined
} from '@ant-design/icons';
import GlassCard from '../components/GlassCard';

const { Title, Text } = Typography;

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>System Overview</Title>
        <Text style={{ color: 'var(--text-secondary)' }}>
          Monitor your AI-driven issue to pull request pipeline.
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <GlassCard>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>Total Issues</span>}
              value={142}
              prefix={<BugOutlined style={{ color: '#6366f1' }} />}
              valueStyle={{ color: '#fff', fontWeight: 600 }}
            />
          </GlassCard>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <GlassCard>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>Processed by AI</span>}
              value={118}
              prefix={<ExperimentOutlined style={{ color: '#ec4899' }} />}
              valueStyle={{ color: '#fff', fontWeight: 600 }}
            />
          </GlassCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <GlassCard>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>PRs Generated</span>}
              value={96}
              prefix={<PullRequestOutlined style={{ color: '#10b981' }} />}
              valueStyle={{ color: '#fff', fontWeight: 600 }}
            />
          </GlassCard>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <GlassCard>
            <Statistic
              title={<span style={{ color: 'var(--text-secondary)' }}>AI Success Rate</span>}
              value={81.3}
              precision={1}
              suffix="%"
              prefix={<CheckCircleOutlined style={{ color: '#f59e0b' }} />}
              valueStyle={{ color: '#fff', fontWeight: 600 }}
            />
          </GlassCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={24}>
          <GlassCard title="Recent Activity" style={{ minHeight: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'var(--text-secondary)' }}>
              Activity stream will appear here...
            </div>
          </GlassCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
