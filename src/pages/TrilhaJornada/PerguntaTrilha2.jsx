// src/pages/TrilhaJornada/PerguntaTrilha2.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaStar } from 'react-icons/fa';

const perguntas = [
  {
    id: 'jornada_1',
    pergunta: 'Foi fácil aprender a jogar este jogo?',
    feedbacks: ['Nada fácil', 'Pouco fácil', 'Neutro', 'Fácil', 'Muito fácil'],
  },
  {
    id: 'jornada_2',
    pergunta: 'Você achou fácil jogar esse jogo?',
    feedbacks: ['Nada fácil', 'Pouco fácil', 'Mais ou menos', 'Fácil', 'Muito fácil'],
  },
  {
    id: 'jornada_3',
    pergunta: 'As regras foram simples de entender?',
    feedbacks: ['Muito difíceis', 'Difíceis', 'Neutras', 'Simples', 'Muito simples'],
  }
];

const trilhaInfo = {
  nome: 'Mestre da Jornada',
  cor: 'from-purple-500 to-indigo-500',
  icone: <FaStar className="text-white text-2xl" />,
};

export default function PerguntaTrilha2() {
  return <PerguntaBase trilhaId="jornada" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
} 
