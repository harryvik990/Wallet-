
import React, { useState } from "react";

const AdminPanel = ({ contract }) => {
  const [threshold, setThreshold] = useState("");

  const updateThreshold = async () => {
    if (!contract || !threshold) return;
    const tx = await contract.setThreshold(parseInt(threshold));
    await tx.wait();
    alert("Threshold updated!");
  };

  return (
    <div>
      <h3>⚙️ Admin Panel</h3>
      <input
        type="number"
        placeholder="New Threshold"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
      />
      <button onClick={updateThreshold}>Update</button>
    </div>
  );
};

export default AdminPanel;
