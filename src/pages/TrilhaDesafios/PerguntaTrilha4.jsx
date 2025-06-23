// src/pages/TrilhaDesafios/PerguntaTrilha4.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaPuzzlePiece } from 'react-icons/fa';

const perguntas = [
  {
    id: 'desafios_1',
    pergunta: 'O jogo te desafiou na medida certa?',
    feedbacks: ['Nada desafiador', 'Pouco desafiador', 'Ok', 'Desafiador', 'Muito desafiador'],
  },
  {
    id: 'desafios_2',
    pergunta: 'Os desafios do jogo apareciam no tempo certo?',
    feedbacks: ['Muito atrasados', 'Pouco sincronizados', 'Razoáveis', 'Bons', 'Perfeitos'],
  },
  {
    id: 'desafios_3',
    pergunta: 'O jogo foi empolgante do começo ao fim?',
    feedbacks: ['Nada empolgante', 'Pouco empolgante', 'Mais ou menos', 'Empolgante', 'Muito empolgante'],
  },
];

const trilhaInfo = {
  nome: 'Explorador de Desafios',
  cor: 'from-yellow-400 to-amber-500',
  icone: <FaPuzzlePiece className="text-white text-2xl" />,
};

export default function PerguntaTrilha4() {
  return <PerguntaBase trilhaId="desafios" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
}
