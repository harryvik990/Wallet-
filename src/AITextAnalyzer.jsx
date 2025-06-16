
import React, { useState } from "react";
import axios from "axios";

const AITextAnalyzer = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const analyzeText = async () => {
    const res = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: \`Analyze this text: \${text}\` }],
    }, {
      headers: {
        Authorization: \`Bearer YOUR_OPENAI_API_KEY\`,
      },
    });
    setResult(res.data.choices[0].message.content);
  };

  return (
    <div>
      <h3>🧠 AI Text Analyzer</h3>
      <textarea rows="4" cols="50" onChange={(e) => setText(e.target.value)} />
      <br />
      <button onClick={analyzeText}>Analyze with AI</button>
      <p>{result}</p>
    </div>
  );
};

export default AITextAnalyzer;
