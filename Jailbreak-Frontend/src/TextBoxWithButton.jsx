import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TextBoxWithButton = () => {
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [backendURL, setBackendURL] = useState('http://localhost:3001/');
  const [loading, setLoading] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleIPChange = (e) => {
    setBackendURL(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setLoading("Loading...");
      const response = await axios.post(backendURL, { message: inputText });
      console.log(response);
      setResultText(response.data);
      setLoading("");
    } catch (error) {
      console.error('Error posting data:', error);
      setLoading("");
    }
  };

  return (
    <div>
      <h1>Unleash Your Creativity</h1>
      <textarea 
        value={inputText} 
        onChange={handleInputChange} 
        placeholder="Write your sentence here..."
        rows="4"
        cols="50"
      />
      <br />
      <textarea 
        value={backendURL} 
        onChange={handleIPChange} 
        placeholder="Write Backend URL here..."
        rows="1"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{loading}</p>
      <br />
      <div style={{border: "1px solid #ccc", padding: "10px", minHeight: "200px", maxWidth: "100vw"}}>
        <ReactMarkdown>{resultText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default TextBoxWithButton;
