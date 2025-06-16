
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import MerkleTreeView from "./MerkleTreeView";
import Dashboard from "./Dashboard";
import QRDeposit from "./QRDeposit";
import NFTViewer from "./NFTViewer";
import DocxAnalyzer from "./DocxAnalyzer";
import AdminPanel from "./AdminPanel";
import AITextAnalyzer from "./AITextAnalyzer";
import { fetchDeposits, fetchChainStarts } from "./api";

const CONTRACT_ADDRESS = "0xYourContractAddress";
const ABI = [ /* Paste your ABI here */ ];

function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [address, setAddress] = useState("");
  const [tree, setTree] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const init = async () => {
      const wallet = new CoinbaseWalletSDK({ appName: "DepositApp" });
      const ethereum = wallet.makeWeb3Provider("https://sepolia.infura.io/v3/YOUR_INFURA_KEY", 11155111);
      await ethereum.request({ method: "eth_requestAccounts" });

      const _provider = new ethers.BrowserProvider(ethereum);
      const signer = await _provider.getSigner();
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const _address = await signer.getAddress();

      setProvider(_provider);
      setContract(_contract);
      setAddress(_address);
    };
    init();
  }, []);

  const handleAnalyzeText = (text) => {
    console.log("Analyzed DOCX text:", text.slice(0, 200));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🚀 Full Coinbase Wallet + NLP + NFT Dashboard</h1>
      <p>Connected Wallet: {address}</p>

      <section>
        <h2>📤 Deposit Section</h2>
        <QRDeposit address={CONTRACT_ADDRESS} amountGwei="3200" />
      </section>

      <section>
        <Dashboard />
      </section>

      <section>
        <MerkleTreeView
          leaves={leaves}
          root={tree?.getHexRoot?.() || "N/A"}
          getProof={(leaf) => tree?.getHexProof?.(leaf) || []}
        />
      </section>

      <section>
        <NFTViewer walletAddress={address} />
      </section>

      <section>
        <DocxAnalyzer onAnalyze={handleAnalyzeText} />
      </section>

      <section>
        <AITextAnalyzer />
      </section>

      <section>
        <AdminPanel contract={contract} />
      </section>
    </div>
  );
}

export default App;
