
import React, { useState } from "react";
import mammoth from "mammoth";

const DocxAnalyzer = ({ onAnalyze }) => {
  const [text, setText] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    setText(result.value);
    onAnalyze(result.value);
  };

  return (
    <div>
      <h3>📄 Upload .docx File for Analysis</h3>
      <input type="file" accept=".docx" onChange={handleFileUpload} />
      <pre>{text.slice(0, 500)}...</pre>
    </div>
  );
};

export default DocxAnalyzer;
