
import React, { useEffect, useState } from "react";
import axios from "axios";

const NFTViewer = ({ walletAddress }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    if (!walletAddress) return;

    const fetchNFTs = async () => {
      const url = \`https://api.opensea.io/api/v1/assets?owner=\${walletAddress}&order_direction=desc&offset=0&limit=10\`;
      const res = await axios.get(url);
      setNfts(res.data.assets);
    };

    fetchNFTs();
  }, [walletAddress]);

  return (
    <div>
      <h3>🖼️ NFT Viewer</h3>
      {nfts.map((nft, index) => (
        <div key={index}>
          <img src={nft.image_url} alt={nft.name} width="200" />
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  );
};

export default NFTViewer;
