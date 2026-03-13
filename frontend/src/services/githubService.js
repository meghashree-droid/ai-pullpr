import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubService = {
  /**
   * Fetch repositories for a given GitHub username.
   * @param {string} username - The GitHub username
   * @returns {Promise<Array>} List of repositories
   */
  getUserRepos: async (username) => {
    try {
      // Using sort=updated to get the most recently active repos
      const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=30`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user repositories:', error);
      throw error;
    }
  },

  /**
   * Fetch open issues for a specific repository.
   * @param {string} owner - The owner of the repository
   * @param {string} repo - The repository name
   * @returns {Promise<Array>} List of issues
   */
  getRepoIssues: async (owner, repo) => {
    try {
      const response = await axios.get(`${GITHUB_API_URL}/repos/${owner}/${repo}/issues?state=open&per_page=50`);
      // Filter out Pull Requests, GitHub API returns PRs as issues
      return response.data.filter(issue => !issue.pull_request);
    } catch (error) {
      console.error('Error fetching repository issues:', error);
      throw error;
    }
  }
};

export const generateCode = async (issue) => {
  const response = await fetch("http://localhost:5000/generate-code", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(issue)
  });

  return response.json();
};

export default githubService; 