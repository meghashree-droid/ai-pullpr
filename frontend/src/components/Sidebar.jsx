import React from 'react';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  IssuesCloseOutlined,
  RobotOutlined,
  CodeOutlined,
  PullRequestOutlined,
  HistoryOutlined,
  SettingOutlined,
  FolderOpenOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/repositories', icon: <FolderOpenOutlined />, label: 'Repositories' },
    { key: '/issues', icon: <IssuesCloseOutlined />, label: 'Repository Issues' },
    { key: '/ai-analysis', icon: <RobotOutlined />, label: 'AI Analysis' },
    { key: '/code-generation', icon: <CodeOutlined />, label: 'Code Generation' },
    { key: '/pull-requests', icon: <PullRequestOutlined />, label: 'Pull Requests' },
    { key: '/logs', icon: <HistoryOutlined />, label: 'AI Review Logs' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Settings' }
  ];

  return (
    <Sider width={240} style={{ height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}>
      <div style={{ 
        height: '64px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <RobotOutlined style={{ fontSize: '28px', color: '#6366f1' }} />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{ borderRight: 0, padding: '16px 0' }}
      />
    </Sider>
  );
};

export default Sidebar;
