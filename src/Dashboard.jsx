
import React, { useEffect, useState } from "react";
import { fetchDeposits, fetchChainStarts } from "./api";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [chainStarts, setChainStarts] = useState([]);

  const loadStats = async () => {
    const deps = await fetchDeposits();
    const starts = await fetchChainStarts();
    setDeposits(deps);
    setChainStarts(starts);
  };

  useEffect(() => {
    loadStats(); // Initial load
    const interval = setInterval(loadStats, 10000); // Auto-refresh every 10s
    return () => clearInterval(interval); // Cleanup
  }, []);

  const depositData = {
    labels: deposits.map((_, i) => i + 1),
    datasets: [
      {
        label: "Deposits",
        data: deposits.map((d) => parseInt(d.amount, 16)),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        fill: true,
      },
    ],
  };

  const chainStartData = {
    labels: chainStarts.map((_, i) => `Start ${i + 1}`),
    datasets: [
      {
        label: "ChainStart Events",
        data: chainStarts.map(() => 1),
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  return (
    <div style={{ marginTop: 40 }}>
      <h2>📊 Deposit Statistics Dashboard (Auto-Refresh)</h2>
      <div style={{ maxWidth: 600 }}>
        <h3>Deposit Volume</h3>
        <Line data={depositData} />
        <h3 style={{ marginTop: 40 }}>ChainStart Events</h3>
        <Bar data={chainStartData} />
      </div>
    </div>
  );
};

export default Dashboard;
