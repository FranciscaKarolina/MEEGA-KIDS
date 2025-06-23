// src/pages/TrilhaAmizade/PerguntaTrilha6.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaUsers } from 'react-icons/fa';

const perguntas = [
  {
    id: 'amizade_1',
    pergunta: 'Você conseguiu jogar e conversar com outras pessoas?',
    feedbacks: ['Não consegui', 'Consegui pouco', 'Mais ou menos', 'Sim', 'Sim, com muita gente!'],
  },
  {
    id: 'amizade_2',
    pergunta: 'No jogo teve momentos de trabalho em equipe ou competição divertida?',
    feedbacks: ['Nada disso', 'Poucos momentos', 'Alguns', 'Sim, vários', 'Sim, foi bem legal!'],
  },
  {
    id: 'amizade_3',
    pergunta: 'Você se sentiu bem jogando com outras pessoas?',
    feedbacks: ['Nada bem', 'Pouco confortável', 'Neutro', 'Bem', 'Muito bem!'],
  },
];

const trilhaInfo = {
  nome: 'Herói da Amizade',
  cor: 'from-indigo-400 to-blue-600',
  icone: <FaUsers className="text-white text-2xl" />,
};

export default function PerguntaTrilha6() {
  return <PerguntaBase trilhaId="amizade" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
}
