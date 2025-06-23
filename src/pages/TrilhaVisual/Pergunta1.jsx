import React from 'react';
import PerguntaBase from '../../components/PerguntaBase';
import { FaEye } from 'react-icons/fa';

const perguntasVisual = [
  {
    id: 'visual_1',
    pergunta: 'O visual do jogo brilhou aos seus olhos?',
    feedbacks: ['Nem um pouco atraente', 'Pouco atraente', 'Neutro', 'Bastante atraente', 'Super atraente'],
  },
  {
    id: 'visual_2',
    pergunta: 'As cores utilizadas no jogo são harmoniosas?',
    feedbacks: ['Nada harmoniosas', 'Pouco harmoniosas', 'Neutro', 'Bastante harmoniosas', 'Extremamente harmoniosas'],
  },
  {
    id: 'visual_3',
    pergunta: 'A interface é fácil de entender visualmente?',
    feedbacks: ['Muito confusa', 'Um pouco confusa', 'Neutra', 'Clara', 'Extremamente clara'],
  },
  {
    id: 'visual_4',
    pergunta: 'As animações são fluidas e agradáveis?',
    feedbacks: ['Nada fluidas', 'Pouco fluidas', 'Aceitáveis', 'Bastante fluidas', 'Extremamente fluidas'],
  },
];

const trilhaInfo = {
  nome: 'Guardião do Visual',
  cor: 'from-blue-500 to-cyan-400',
  icone: <FaEye className="text-white text-2xl" />,
};

const Pergunta1 = () => {
  return <PerguntaBase trilhaId="visual" trilhaInfo={trilhaInfo} perguntas={perguntasVisual} />;
};

export default Pergunta1;
