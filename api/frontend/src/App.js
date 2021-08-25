import './App.css';
import axios from 'axios';
import React, { useState } from 'react';

const url = 'http://localhost:8000'

const fetchApi = (base, ementa = {}) => {
  return axios.post(url + base, { annotation: ementa }).then(res => {
    if (res.status !== 200)
      return null;
    return res;
  })
}

const getClassification = (ementa) => {
  return fetchApi('/classify/', ementa).then(data => {
    if (data)
      return data.data;
  })
}

function App() {
  let [ementa, setEmenta] = useState('')
  let [response, setResponse] = useState({
    branch: '',
    confidence: '',
    probabilities: {}
  })
  const handleClick = async () => {
    const res = await getClassification(ementa);
    setResponse(res);
  }

  const handleChange = e => {
    setEmenta(e.target.value);
  }
  return (
    <div className="App">
      <form>
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          <h1>Digite a ementa do acórdão</h1>
          <textarea placeholder="Ementa..." rows="15" onChange={ handleChange } value={ementa}></textarea>
          <button type="button" onClick={ handleClick }>Classificar</button>
          <label className="input-label" htmlFor="branch">Ramo do Direito:</label><br />
          <input type="text" id="branch" value={ response.branch } disabled />
          <label className="input-label" htmlFor="confidence">Confiança:</label><br />
          <input type="text" id="confidence" value={ response.confidence } disabled />
          <label className="input-label" htmlFor="percentage">Porcentagens:</label><br />
          <textarea id="percentage" rows="13" value={ JSON.stringify(response.probabilities, null, 2) } disabled></textarea>
        </div>
      </form>
    </div>
  );
}

export default App;
