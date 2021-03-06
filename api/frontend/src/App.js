import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import csvFile from './All_Law_Documents.csv';
import * as d3 from 'd3';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chart from './Chart';

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

const getSimpleClassification = (ementa) => {
  return fetchApi('/simple_classify/', ementa).then(data => {
    if (data)
      return data.data;
  })
}

const getLRClassification = (ementa) => {
  return fetchApi('/lr_classify/', ementa).then(data => {
    if (data)
      return data.data;
  })
}

const loadLawDocuments = () => {
  const allLawDocuments = [];

  d3.csv(csvFile, function(data) {
    const documentCode = data['cod_acordao'];
    const documentAnnotation = data['ementa'];

    allLawDocuments.push({'value': documentAnnotation, 'label': documentCode})
  });

  return allLawDocuments;
}

const allOptions = loadLawDocuments();

function App() {
  let [ementa, setEmenta] = useState('')
  let [response, setResponse] = useState({
    branch: '',
    confidence: '',
    probabilities: {}
  })
  let [simpleResponse, setSimpleResponse] = useState({
    branch: ''
  })
  let [lrResponse, setLRResponse] = useState({
    branch: ''
  })

  const handleClick = async () => {
    const res = await getClassification(ementa);
    setResponse(res);
    const simpleRes = await getSimpleClassification(ementa);
    setSimpleResponse(simpleRes);
    const lrRes = await getLRClassification(ementa);
    setLRResponse(lrRes);
  }

  const handleChange = e => {
    setEmenta(e.target.value);
  }

  const handleOptionSelection = (_, selectedValue) => {
    if (selectedValue == null || selectedValue.value == null) {
      setEmenta('');
    } else {
      setEmenta(selectedValue.value);
    }
  }

  return (
    <div className="App">
      <form>
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          <h1>Digite a ementa do ac??rd??o</h1>
          <Autocomplete options={ allOptions } onChange={ handleOptionSelection } renderInput={(params) => <TextField {...params} label="Ac??rd??os" />}/>
          <textarea placeholder="Ementa..." rows="15" onChange={ handleChange } value={ementa}></textarea>
          <button type="button" onClick={ handleClick }>Classificar</button>
          <label className="input-label" htmlFor="branch">Ramo do Direito:</label><br />
          <input type="text" id="branch" value={ response.branch } disabled />
          <label className="input-label" htmlFor="confidence">Confian??a:</label><br />
          <input type="text" id="confidence" value={ response.confidence } disabled />
          <label className="input-label" htmlFor="percentage">Porcentagens:</label><br />
          <textarea id="percentage" rows="13" value={ JSON.stringify(response.probabilities, null, 2) } disabled></textarea>
          <Chart probabilities={response.probabilities} />
          <div className='box'>
            <label className="input-label" htmlFor="branch">Ramo do Direito Classificado pelo Modelo de Regress??o Log??stica:</label><br />
            <input type="text" id="branch" value={ lrResponse.branch } disabled />
          </div>
          <div className='box'>
            <label className="input-label" htmlFor="branch">Ramo do Direito Classificado pelo Modelo Simples:</label><br />
            <input type="text" id="branch" value={ simpleResponse.branch } disabled />
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
