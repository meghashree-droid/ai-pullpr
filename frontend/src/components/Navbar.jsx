import React, { useState } from 'react';
import { Layout, Dropdown, Menu, Badge, Avatar, Typography, Space, Input } from 'antd';
import { 
  GithubOutlined, 
  BellOutlined, 
  UserOutlined,
  CaretDownOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './../index.css';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const [navSearch, setNavSearch] = useState('');

  const handleNavSearch = () => {
    if (navSearch.trim()) {
      navigate(`/repositories?user=${navSearch.trim()}`);
      setNavSearch('');
    }
  };
  const repoMenu = (
    <Menu
      theme="dark"
      style={{ background: 'rgba(26, 27, 58, 0.9)', backdropFilter: 'blur(10px)' }}
      items={[
        { key: '1', label: 'ai-pullpr-backend', icon: <GithubOutlined /> },
        { key: '2', label: 'ai-pullpr-frontend', icon: <GithubOutlined /> },
        { type: 'divider' },
        { key: '3', label: 'Add Repository...' }
      ]}
    />
  );

  return (
    <Header style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Text strong style={{ fontSize: '18px', color: '#fff' }} className="neon-text">
          Issue-to-PR Automation
        </Text>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Input 
          placeholder="GitHub profile link or username..." 
          prefix={<SearchOutlined style={{ color: 'var(--text-secondary)' }} />}
          value={navSearch}
          onChange={(e) => setNavSearch(e.target.value)}
          onPressEnter={handleNavSearch}
          style={{ 
            background: 'rgba(255, 255, 255, 0.05)', 
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            width: '300px',
            borderRadius: '20px'
          }}
          className="glass-input"
        />

        <Badge count={3} size="small">
          <BellOutlined style={{ fontSize: '18px', color: '#f8fafc', cursor: 'pointer' }} />
        </Badge>

        <Avatar 
          style={{ backgroundColor: '#6366f1', cursor: 'pointer' }} 
          icon={<UserOutlined />} 
        />
      </div>
    </Header>
  );
};

export default Navbar;
