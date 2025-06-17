import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Resultado.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Resultado = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const respostas = location.state?.respostas;
  const trilhaId = location.state?.trilhaId || 'visual';

  if (!respostas || Object.keys(respostas).length === 0) {
    return (
      <div className="resultado-container">
        <h1>Nenhum resultado encontrado 😢</h1>
        <p>Você precisa responder as perguntas da trilha para ver seu resultado.</p>
        <button className="btn-primario" onClick={() => {
          navigate('/trilha');
          window.location.reload(); // força a atualização do progresso
        }}>
          Voltar para Trilhas
        </button>
      </div>
    );
  }

  const totalPerguntas = Object.keys(respostas).length;
  const somaRespostas = Object.values(respostas).reduce((acc, val) => acc + val, 0);
  const media = (somaRespostas / totalPerguntas).toFixed(1);

  const feedbackGeral = () => {
    if (media < 2) return 'A experiência visual precisa melhorar bastante.';
    if (media < 3) return 'A estética ainda não está boa.';
    if (media < 4) return 'A experiência visual está aceitável.';
    if (media < 4.5) return 'A experiência visual está muito boa!';
    return 'Visual incrível! Ótimo trabalho!';
  };

  const chartData = {
    labels: Object.keys(respostas),
    datasets: [
      {
        label: 'Nota atribuída por pergunta',
        data: Object.values(respostas),
        backgroundColor: '#6366f1',
        borderRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div className="resultado-container">
      <h1>Resultado da Trilha: {trilhaId.toUpperCase()}</h1>
      <p>Você respondeu <strong>{totalPerguntas}</strong> perguntas.</p>
      <p>Média geral das respostas: <strong>{media}</strong> ⭐</p>
      <p className="feedback">{feedbackGeral()}</p>

      <div className="grafico-colunas">
        <h2>Resumo das Respostas</h2>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <button className="btn-primario" onClick={() => {
        navigate('/trilha');
        window.location.reload(); // força atualização ao voltar
      }}>
        Voltar para Trilhas
      </button>
    </div>
  );
};

export default Resultado;
