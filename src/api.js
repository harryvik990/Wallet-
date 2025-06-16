
import axios from "axios";

const API_BASE = "http://localhost:5000"; // Update to production backend URL when deployed

export async function fetchDeposits() {
  try {
    const res = await axios.get(\`\${API_BASE}/deposits\`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch deposits:", err);
    return [];
  }
}

export async function fetchChainStarts() {
  try {
    const res = await axios.get(\`\${API_BASE}/chainstarts\`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch chain starts:", err);
    return [];
  }
}
