import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Row, Col, Space, Empty, Spin, Tag } from 'antd';
import { 
  GithubOutlined, 
  SearchOutlined,
  StarOutlined,
  FolderOpenOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import githubService from '../services/githubService';

const { Title, Text, Paragraph } = Typography;

const Repositories = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryUser = searchParams.get('user');
  
  const [username, setUsername] = useState(queryUser || '');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [searched, setSearched] = useState(!!queryUser);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (queryUser) {
      fetchRepos(queryUser);
    }
  }, [queryUser]);

  const handleSearch = () => {
    if (!username.trim()) return;
    
    // Support pasting full URL like https://github.com/username
    let parsedUsername = username.trim();
    if (parsedUsername.includes('github.com/')) {
      const parts = parsedUsername.split('github.com/');
      if (parts.length > 1) {
        parsedUsername = parts[1].split('/')[0];
        setUsername(parsedUsername);
      }
    }
    
    setSearchParams({ user: parsedUsername });
    fetchRepos(parsedUsername);
  };

  const fetchRepos = async (user) => {
    setLoading(true);
    setError(null);
    setSearched(true);
    
    try {
      const data = await githubService.getUserRepos(user);
      setRepos(data);
    } catch (err) {
      setError('Could not fetch repositories. Please check the username and try again.');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenRepo = (repo) => {
    // Navigate to issues page with repo metadata
    navigate(`/issues?owner=${repo.owner.login}&repo=${repo.name}`);
  };

  return (
    <div className="repos-container">
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Connect GitHub</Title>
        <Text style={{ color: 'var(--text-secondary)' }}>
          Enter a GitHub profile or repository URL to load repositories.
        </Text>
      </div>

      <GlassCard style={{ marginBottom: 32 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Input
            size="large"
            placeholder="e.g. https://github.com/username or just 'username'"
            prefix={<GithubOutlined style={{ color: 'var(--text-secondary)' }} />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onPressEnter={handleSearch}
            className="glass-input"
            style={{ 
              background: 'rgba(11, 15, 25, 0.4)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: '#fff'
            }}
          />
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={handleSearch}
            loading={loading}
            style={{ 
              background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 100%)',
              border: 'none',
              padding: '0 32px',
              height: '40px'
            }}
          >
            Fetch Repositories
          </Button>
        </Space>
      </GlassCard>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16, color: 'var(--text-secondary)' }}>Fetching repositories...</div>
        </div>
      )}

      {error && !loading && (
        <GlassCard style={{ borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <Text type="danger">{error}</Text>
        </GlassCard>
      )}

      {!loading && searched && !error && repos.length === 0 && (
        <Empty 
          description={<span style={{ color: 'var(--text-secondary)' }}>No repositories found</span>} 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}

      {!loading && repos.length > 0 && (
        <Row gutter={[24, 24]}>
          {repos.map(repo => (
            <Col xs={24} md={12} lg={8} key={repo.id}>
              <GlassCard 
                hoverable 
                className="repo-card"
                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                onClick={() => handleOpenRepo(repo)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                    <Title level={4} style={{ color: '#fff', margin: 0, wordBreak: 'break-word', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FolderOpenOutlined style={{ color: '#6366f1' }} />
                      {repo.name}
                    </Title>
                    {repo.private && <Tag color="default">Private</Tag>}
                  </div>
                  
                  <Paragraph 
                    style={{ color: 'var(--text-secondary)', minHeight: '44px' }}
                    ellipsis={{ rows: 2 }}
                  >
                    {repo.description || "No description provided."}
                  </Paragraph>
                </div>

                <div style={{ 
                  marginTop: 'auto', 
                  paddingTop: 16,
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Space size="middle">
                    {repo.language && (
                      <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }}></div>
                        {repo.language}
                      </span>
                    )}
                    <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <StarOutlined /> {repo.stargazers_count}
                    </span>
                  </Space>
                  <Button 
                    type="link" 
                    icon={<CodeOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenRepo(repo);
                    }}
                    style={{ padding: 0 }}
                  >
                    Open
                  </Button>
                </div>
              </GlassCard>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Repositories;
