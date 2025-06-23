// src/pages/TrilhaCoracao/PerguntaTrilha5.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaHeart } from 'react-icons/fa';

const perguntas = [
  {
    id: 'coracao_1',
    pergunta: 'Você se sente orgulhoso ao completar as tarefas do jogo?',
    feedbacks: ['Nada orgulhoso', 'Pouco orgulhoso', 'Mais ou menos', 'Orgulhoso', 'Muito orgulhoso'],
  },
  {
    id: 'coracao_2',
    pergunta: 'Você indicaria esse jogo aos seus amigos?',
    feedbacks: ['De jeito nenhum', 'Provavelmente não', 'Talvez', 'Sim', 'Com certeza!'],
  },
  {
    id: 'coracao_3',
    pergunta: 'Você sente que avançou no jogo por mérito próprio?',
    feedbacks: ['Nada', 'Pouco', 'Mais ou menos', 'Sim', 'Totalmente!'],
  },
  {
    id: 'coracao_4',
    pergunta: 'Você ficou feliz com o que aprendeu?',
    feedbacks: ['Nada feliz', 'Pouco feliz', 'Mais ou menos', 'Feliz', 'Muito feliz!'],
  },
];

const trilhaInfo = {
  nome: 'Coração Valente',
  cor: 'from-red-500 to-pink-500',
  icone: <FaHeart className="text-white text-2xl" />,
};

export default function PerguntaTrilha5() {
  return <PerguntaBase trilhaId="coracao" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
}
