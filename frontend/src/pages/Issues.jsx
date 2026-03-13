import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Badge, Spin, Space, Empty } from 'antd';
import { RobotOutlined, SyncOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import githubService from '../services/githubService';

const { Title, Text } = Typography;

const Issues = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (owner && repo) {
      fetchIssues(owner, repo);
    }
  }, [owner, repo]);

  const fetchIssues = async (ownerName, repoName) => {
    setLoading(true);
    setError(null);
    try {
      const data = await githubService.getRepoIssues(ownerName, repoName);
      // Map API data to our table structure
      const formattedIssues = data.map(issue => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        repo: repoName,
        status: issue.state.charAt(0).toUpperCase() + issue.state.slice(1),
        labels: issue.labels,
        date: new Date(issue.created_at).toLocaleDateString(),
        aiStatus: 'pending', // default mocked state
        url: issue.html_url
      }));
      setIssues(formattedIssues);
    } catch (err) {
      setError('Failed to fetch issues. Please ensure the repository exists and is accessible.');
    } finally {
      setLoading(false);
    }
  };

  const getLabelColor = (labelName) => {
    const name = labelName.toLowerCase();
    if (name.includes('bug')) return 'volcano';
    if (name.includes('feature') || name.includes('enhancement')) return 'green';
    if (name.includes('documentation')) return 'blue';
    if (name.includes('help wanted')) return 'purple';
    return 'default';
  };

  const getAiStatusBadge = (status) => {
    switch(status) {
      case 'completed': return <Badge status="success" text={<span style={{ color: 'var(--text-secondary)' }}>Analyzed</span>} />;
      case 'failed': return <Badge status="error" text={<span style={{ color: 'var(--text-secondary)' }}>Failed</span>} />;
      case 'processing': return <Badge status="processing" text={<span style={{ color: 'var(--text-secondary)' }}>Processing</span>} />;
      default: return <Badge status="default" text={<span style={{ color: 'var(--text-secondary)' }}>Pending</span>} />;
    }
  };

  const handleAnalyze = (record) => {
    setAnalyzingId(record.id);
    // Navigate to analysis view with issue data
    setTimeout(() => {
      navigate('/ai-analysis', { state: { issue: record } });
    }, 600);
  };

  const columns = [
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong style={{ color: '#fff' }}>{text}</Text>
          <Text type="secondary" style={{ fontSize: '12px' }}>#{record.number}</Text>
        </Space>
      ),
    },
    {
      title: 'Labels',
      dataIndex: 'labels',
      key: 'labels',
      render: (labels) => (
        <Space size={[0, 4]} wrap>
          {labels.length > 0 ? labels.map(label => (
            <Tag color={getLabelColor(label.name)} key={label.id}>
              {label.name}
            </Tag>
          )) : <Text type="secondary" italic>No labels</Text>}
        </Space>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Text style={{ color: 'var(--text-secondary)' }}>{text}</Text>,
    },
    {
      title: 'AI Status',
      dataIndex: 'aiStatus',
      key: 'aiStatus',
      render: (status) => getAiStatusBadge(status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<RobotOutlined />} 
          loading={analyzingId === record.id}
          onClick={() => handleAnalyze(record)}
          style={{ 
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
            border: 'none',
            minWidth: '140px'
          }}
        >
          {analyzingId === record.id ? 'Starting...' : 'Analyze with AI'}
        </Button>
      ),
    },
  ];

  if (!owner || !repo) {
    return (
      <div className="issues-container">
        <div style={{ marginBottom: 32 }}>
          <Title level={2} style={{ color: '#fff', margin: 0 }}>Repository Issues</Title>
          <Text style={{ color: 'var(--text-secondary)' }}>
            Please select a repository first to view its issues.
          </Text>
        </div>
        <GlassCard>
          <Empty 
            description={<span style={{ color: 'var(--text-secondary)' }}>No repository selected</span>}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => navigate('/repositories')}>
              Go to Repositories
            </Button>
          </Empty>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="issues-container">
      <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate(-1)}
            style={{ color: 'var(--text-secondary)', padding: '0 0 8px 0' }}
          >
            Back to Repositories
          </Button>
          <Title level={2} style={{ color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            {repo} Issues
          </Title>
          <Text style={{ color: 'var(--text-secondary)' }}>
            Select open issues from {owner}/{repo} to trigger automated AI analysis and PR generation.
          </Text>
        </div>
        <Button 
          icon={<SyncOutlined spin={loading} />} 
          type="default" 
          ghost 
          className="glass-card"
          onClick={() => fetchIssues(owner, repo)}
          disabled={loading}
        >
          Refresh
        </Button>
      </div>

      {error && (
        <GlassCard style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', marginBottom: 24 }}>
          <Text type="danger">{error}</Text>
        </GlassCard>
      )}

      <GlassCard>
        {loading ? (
           <div style={{ textAlign: 'center', padding: '40px 0' }}>
             <Spin size="large" />
             <div style={{ marginTop: 16, color: 'var(--text-secondary)' }}>Loading repository issues from GitHub...</div>
           </div>
        ) : (
          <Table 
            columns={columns} 
            dataSource={issues} 
            rowKey="id"
            pagination={{ pageSize: 15 }}
            className="custom-table"
            locale={{ emptyText: <Empty description={<span style={{ color: 'var(--text-secondary)' }}>No open issues found for this repository.</span>} image={Empty.PRESENTED_IMAGE_SIMPLE} /> }}
          />
        )}
      </GlassCard>
    </div>
  );
};

export default Issues;
