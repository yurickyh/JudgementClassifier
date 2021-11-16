import React from 'react';
import { Bar } from 'react-chartjs-2';

const OPTIONS = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Probabilidades da predição do modelo',
    },
  },
  scales: {
    y: {
      ticks: {
        autoSkip: false,
      }
    },
    x: {
      ticks: {
        autoSkip: false
      }
    }
  }
};

const MAP_NAME = {
  'Direito Penal (Direito Processual Penal)': 'Penal',
  'Direito Administrativo (Licitações, Contratos Administrativos, Servidores, Desapropriação, Tribunal de Contas, Improbidade, etc.)': 'Administrativo',
  'Direito Tributário/Direito Financeiro': 'Tributário/Financeiro',
  'Direito Civil (Direito Comercial/Direito de Família)': 'Civil',
  'Direito Previdenciário': 'Previdenciário',
  'Direito do Trabalho': 'Trabalho',
  'Direito Processual Civil': 'Processual Civil',
  'Direito Eleitoral': 'Eleitoral',
  'Direito do Consumidor': 'Consumidor',
  'Direito Internacional (Público ou Privado)': 'Internacional',
  'Direito Militar': 'Militar',
  'Direito Econômico (Direito concorrencial e Agências Reguladoras Setoriais, Intervenção no Domínio Econômico)': 'Econômico',
  'Direito Ambiental': 'Ambiental'
}

const generateData = (probabilities) => {
  return {
    labels: Object.keys(probabilities).map((lawBranchName) => MAP_NAME[lawBranchName]),
    datasets: [
      {
        label: 'Probabilidade do acórdão pertencer à classe',
        data: Object.values(probabilities),
        backgroundColor: [
          'rgba(38, 114, 120, 0.2)',
          'rgba(101, 51, 141, 0.2)',
          'rgba(71, 112, 179, 0.2)',
          'rgba(210, 31, 117, 0.2)',
          'rgba(59, 54, 185, 0.2)',
          'rgba(80, 174, 211, 0.2)',
          'rgba(72, 178, 79, 0.2)',
          'rgba(229, 116, 56, 0.2)',
          'rgba(86, 157, 210, 0.2)',
          'rgba(86, 157, 121, 0.2)',
          'rgba(88, 89, 91, 0.2)',
          'rgba(228, 176, 49, 0.2)',
          'rgba(132, 210, 244, 0.2)'
        ],
        borderColor: [
          'rgba(38, 114, 120, 1)',
          'rgba(101, 51, 141, 1)',
          'rgba(71, 112, 179, 1)',
          'rgba(210, 31, 117, 1)',
          'rgba(59, 54, 185, 1)',
          'rgba(80, 174, 211, 1)',
          'rgba(72, 178, 79, 1)',
          'rgba(229, 116, 56, 1)',
          'rgba(86, 157, 210, 1)',
          'rgba(86, 157, 121, 1)',
          'rgba(88, 89, 91, 1)',
          'rgba(228, 176, 49, 1)',
          'rgba(132, 210, 244, 1)'
        ],
        borderWidth: 1,
      },
    ],
  }
};

function Chart(props) {
  return (
    <Bar data={generateData(props.probabilities)} options={OPTIONS} />
  );
}

export default Chart;