import React from 'react';
import { Card } from 'antd';
import './../index.css';

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <Card 
      className={`glass-card ${className}`} 
      bordered={false}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
