import React, { useState } from 'react';
import { Typography, Button, Space, Tag, Modal, notification } from 'antd';
import {
  PullRequestOutlined,
  LeftOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import GlassCard from '../components/GlassCard';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';
import { generateCode } from "../services/githubService";

const handleGenerate = async () => {
  const result = await generateCode(issue);

  setGeneratedCode(result.generatedCode);
};

const { Title, Text } = Typography;

const CodeGeneration = () => {
  const navigate = useNavigate();
  const [approved, setApproved] = useState(false);

  const codeString = `
@@ -45,7 +45,13 @@ export const authenticateToken = (req: Request, res: Response, next: NextFunctio
     return res.status(401).json({ error: 'Access token missing' });
   }

-  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
+  jwt.verify(token, process.env.JWT_SECRET as string, async (err, user) => {
     if (err) {
-      return res.status(403).json({ error: 'Invalid or expired token' });
+      if (err.name === 'TokenExpiredError') {
+        // Attempt to refresh token based on rotating refresh token logic
+        const refreshed = await TokenService.attemptRefresh(req);
+        if (refreshed) return next();
+      }
+      return res.status(403).json({ error: 'Invalid token' });
     }
`;

  const handleApprove = () => {
    setApproved(true);
    notification.success({
      message: 'Code Changes Approved',
      description: 'The generated code diff has been verified. You can now create a pull request.',
      placement: 'topRight',
    });
  };

  const handleReject = () => {
    navigate(-1);
  };

  const handleCreatePR = () => {
    notification.success({
      message: 'Pull Request Generated',
      description: 'The AI has successfully created a pull request on GitHub.',
      placement: 'topRight',
    });
    setTimeout(() => {
      navigate('/pull-requests');
    }, 1500);
  };

  return (
    <div className="code-gen-container">
      <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Button
            type="text"
            icon={<LeftOutlined />}
            style={{ color: 'var(--text-secondary)', padding: 0, marginBottom: 8 }}
            onClick={() => navigate(-1)}
          >
            Back to Analysis
          </Button>
          <Title level={2} style={{ color: '#fff', margin: 0 }}>Generated Solution</Title>
          <Text style={{ color: 'var(--text-secondary)' }}>
            Review the side-by-side code diffs patched by the AI.
          </Text>
        </div>

        <Space>
          {!approved ? (
            <>
              <Button
                danger
                ghost
                icon={<CloseOutlined />}
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleApprove}
                style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
                  border: 'none',
                }}
              >
                Approve Changes
              </Button>
            </>
          ) : (
            <Button
              type="primary"
              icon={<PullRequestOutlined />}
              onClick={handleCreatePR}
              size="large"
              style={{
                background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                border: 'none',
                padding: '0 24px',
                height: '40px'
              }}
            >
              Create Pull Request
            </Button>
          )}
        </Space>
      </div>

      <GlassCard title={<span style={{ color: '#fff' }}>src/middleware/AuthMiddleware.ts</span>}>
        <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tag color="success" icon={<CheckOutlined />}>+6 additions</Tag>
            <Tag color="error">-2 deletions</Tag>
            {approved && <Tag color="gold">Changes Approved ✓</Tag>}
          </div>
        </Space>

        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
          <SyntaxHighlighter
            language="diff"
            style={vscDarkPlus}
            customStyle={{ margin: 0, background: 'rgba(11, 15, 25, 0.5)' }}
            showLineNumbers={false}
          >
            {codeString.trim()}
          </SyntaxHighlighter>
        </div>
      </GlassCard>
    </div>
  );
};

export default CodeGeneration;  