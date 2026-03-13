import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          colorBgContainer: 'rgba(11, 15, 25, 0.6)',
          colorBgElevated: 'rgba(26, 27, 58, 0.9)',
          colorText: '#f8fafc',
          borderRadius: 8,
          wireframe: false,
        },
        components: {
          Layout: {
            bodyBg: 'transparent',
            headerBg: 'transparent',
          },
          Card: {
            colorBgContainer: 'transparent',
            colorBorderSecondary: 'rgba(255, 255, 255, 0.1)'
          }
        }
      }}
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
