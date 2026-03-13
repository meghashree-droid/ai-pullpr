import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

app.get("/", (req, res) => {
    res.send("Backend server is running");
});

app.post("/generate-code", async (req, res) => {
    const { issueTitle, issueBody } = req.body;

    const generatedCode = `// Fix for: ${issueTitle}

function fixIssue(){
  console.log("Issue resolved");
}
`;

    res.json({ generatedCode });
});

app.post("/generate-code", async (req, res) => {
    try {
        const { repo, issueTitle, issueBody } = req.body;

        const prompt = `
Fix this GitHub issue.

Issue Title:
${issueTitle}

Issue Description:
${issueBody}

Generate revised code to fix it.
`;

        // Example AI call placeholder
        const aiResponse = {
            generatedCode: "// Example fix\nfunction fixIssue(){ console.log('fixed') }"
        };

        res.json(aiResponse);

    } catch (error) {
        res.status(500).json({ error: "Code generation failed" });
    }
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
}); 