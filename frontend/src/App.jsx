import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Issues from './pages/Issues';
import AIAnalysis from './pages/AIAnalysis';
import CodeGeneration from './pages/CodeGeneration';
import PullRequests from './pages/PullRequests';
import Repositories from './pages/Repositories';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="repositories" element={<Repositories />} />
          <Route path="issues" element={<Issues />} />
          <Route path="ai-analysis" element={<AIAnalysis />} />
          <Route path="code-generation" element={<CodeGeneration />} />
          <Route path="pull-requests" element={<PullRequests />} />
          {/* Catch all route - map unhandled paths back to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
