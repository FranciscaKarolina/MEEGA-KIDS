// src/pages/TrilhaSaberes/PerguntaTrilha3.jsx
import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaBook } from 'react-icons/fa';

const perguntas = [
  {
    id: 'saberes_1',
    pergunta: 'O conteúdo do jogo te deixou confiante para aprender?',
    feedbacks: ['Nada confiante', 'Pouco confiante', 'Neutro', 'Confiante', 'Muito confiante'],
  },
  {
    id: 'saberes_2',
    pergunta: 'Você achou o conteúdo do jogo interessante?',
    feedbacks: ['Nada interessante', 'Pouco interessante', 'Mais ou menos', 'Interessante', 'Muito interessante'],
  },
  {
    id: 'saberes_3',
    pergunta: 'Você entendeu como o jogo se conecta com a disciplina?',
    feedbacks: ['Nada claro', 'Pouco claro', 'Mais ou menos', 'Claro', 'Muito claro'],
  },
  {
    id: 'saberes_4',
    pergunta: 'Você aprendeu algo da matéria com o jogo?',
    feedbacks: ['Nada', 'Quase nada', 'Mais ou menos', 'Sim', 'Aprendi muito'],
  },
  {
    id: 'saberes_5',
    pergunta: 'Você prefere aprender com jogo ao invés de aula tradicional?',
    feedbacks: ['Prefiro aula tradicional', 'Gosto mais de aula tradicional', 'Tanto faz', 'Prefiro jogo', 'Muito mais com jogo'],
  },
];

const trilhaInfo = {
  nome: 'Caçador de Saberes',
  cor: 'from-green-500 to-emerald-400',
  icone: <FaBook className="text-white text-2xl" />,
};

export default function PerguntaTrilha3() {
  return <PerguntaBase trilhaId="saberes" trilhaInfo={trilhaInfo} perguntas={perguntas} />;
}
