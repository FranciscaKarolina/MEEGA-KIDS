import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa';
import './PerguntaTrilha2.css';

const Pergunta2 = () => {
  const trilhaId = 'jornada';
  console.log("Trilha ID recebida:", trilhaId); // Esperado: "jornada"
  const navigate = useNavigate();

  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  // Perguntas da trilha "Mestre da Jornada"
  const perguntasJornada = [
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
    jornada: {
      nome: 'Mestre da Jornada',
      cor: 'from-purple-500 to-indigo-500',
      icone: <FaStar className="text-white text-2xl" />,
    },
  }[trilhaId] || {
    nome: 'Trilha Desconhecida',
    cor: 'from-gray-500 to-gray-400',
    icone: <FaStar className='text-white text-2xl' />,
  };

  const perguntas = trilhaId === 'jornada' ? perguntasJornada : [];

  const selecionarResposta = (perguntaId, valor) => {
    setRespostas({
      ...respostas,
      [perguntaId]: valor
    });
  };

  const proximaPergunta = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      window.scrollTo(0, 0);
    } else {
      fetch('http://localhost:3001/respostas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trilha: trilhaId,
          respostas: respostas
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.message);
          navigate('/trilha/resultado', {
            state: {
              respostas,
              trilhaId
            }
          });
        })
        .catch(err => {
          console.error('Erro ao salvar respostas', err);
        });
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/trilha');
    }
  };

  if (perguntas.length === 0) {
    return (
      <div className="trilha-perguntas-container">
        <div className="trilha-perguntas-content">
          <h1>Trilha não encontrada</h1>
          <button className="btn-primario" onClick={() => navigate('/trilha')}>
            Voltar para Trilhas
          </button>
        </div>
      </div>
    );
  }

  const perguntaAtualObj = perguntas[perguntaAtual];
  const respostaSelecionada = respostas[perguntaAtualObj.id] || 0;

  return (
    <div className='pergunta-container'>
      <div className="trilha-perguntas-container">
        <header className="trilha-perguntas-header">
          <div className="header-content">
            <div className="header-left">
              <button className="btn-voltar" onClick={perguntaAnterior}>
                <FaArrowLeft /> Voltar
              </button>
            </div>
            <div className="header-center">
              <div className={`trilha-badge bg-gradient-to-r ${trilhaInfo.cor}`}>
                <span className="trilha-badge-icon">{trilhaInfo.icone}</span>
                <span className="trilha-badge-texto">{trilhaInfo.nome}</span>
              </div>
            </div>
            <div className="header-right">
              <span className="progresso-texto">
                Pergunta {perguntaAtual + 1} de {perguntas.length}
              </span>
            </div>
          </div>
        </header>

        <main className="trilha-perguntas-content">
          <div className="progresso-container">
            <div className="progresso-barra">
              <div
                className="progresso-preenchido"
                style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="pergunta-card">
            <h2 className="pergunta-texto">{perguntaAtualObj.pergunta}</h2>

            {respostaSelecionada > 0 && (
              <div className="feedback-texto">
                {perguntaAtualObj.feedbacks[respostaSelecionada - 1]}
              </div>
            )}

            <div className="opcoes-container">
              {[1, 2, 3, 4, 5].map((valor) => (
                <div
                  key={valor}
                  className={`opcao ${respostaSelecionada === valor ? 'selecionada' : ''}`}
                  onClick={() => selecionarResposta(perguntaAtualObj.id, valor)}
                >
                  <div className="opcao-emoji">
                    {valor === 1 && '😕'}
                    {valor === 2 && '🙁'}
                    {valor === 3 && '😐'}
                    {valor === 4 && '🙂'}
                    {valor === 5 && '😄'}
                  </div>
                  <div className="opcao-valor">{valor}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="navegacao-botoes">
            <button className="btn-secundario" onClick={perguntaAnterior}>
              <FaArrowLeft /> Anterior
            </button>

            <button
              className="btn-primario"
              onClick={proximaPergunta}
              disabled={!respostas[perguntaAtualObj.id]}
            >
              {perguntaAtual < perguntas.length - 1 ? 'Próxima' : 'Finalizar'} <FaArrowRight />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pergunta2;
