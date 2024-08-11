import React, { useState } from 'react';
import axios from 'axios';

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
      <textarea 
        value={resultText} 
        readOnly 
        placeholder="Result will be displayed here..."
        rows="100"
        cols="50"
      />
    </div>
  );
};

export default TextBoxWithButton;
