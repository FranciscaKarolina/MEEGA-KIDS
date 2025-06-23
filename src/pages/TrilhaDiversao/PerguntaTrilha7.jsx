// src/pages/TrilhaDiversao/PerguntaTrilha7.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaGamepad } from 'react-icons/fa';

const perguntas = [
  {
    id: 'diversao_1',
    pergunta: 'Você se divertiu jogando?',
    feedbacks: ['Nada divertido', 'Pouco divertido', 'Mais ou menos', 'Divertido', 'Muito divertido!'],
  },
  {
    id: 'diversao_2',
    pergunta: 'O começo do jogo prendeu sua atenção?',
    feedbacks: ['Nada envolvente', 'Pouco envolvente', 'Neutro', 'Interessante', 'Muito envolvente'],
  },
  {
    id: 'diversao_3',
    pergunta: 'Você ficou tão imerso no jogo que nem viu o tempo passar?',
    feedbacks: ['Nada imerso', 'Pouco imerso', 'Neutro', 'Imerso', 'Totalmente imerso'],
  }
];

const trilhaInfo = {
  nome: 'Mestre da Diversão',
  cor: 'from-orange-400 to-red-400',
  icone: <FaGamepad className="text-white text-2xl" />,
};

export default function PerguntaTrilha7() {
  return <PerguntaBase trilhaId="diversao" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
}
