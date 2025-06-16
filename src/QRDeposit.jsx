
import React from "react";
import QRCode from "qrcode.react";

const QRDeposit = ({ address, amountGwei }) => {
  const ethAmount = (parseFloat(amountGwei) / 1e9).toFixed(9); // Gwei to ETH
  const paymentURI = `ethereum:${address}?value=${ethAmount}`;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>📱 Scan with Coinbase Wallet</h3>
      <QRCode value={paymentURI} size={180} />
      <p>Address: {address}</p>
      <p>Amount: {amountGwei} Gwei</p>
    </div>
  );
};

export default QRDeposit;
