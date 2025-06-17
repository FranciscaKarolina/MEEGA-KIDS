import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaPuzzlePiece } from 'react-icons/fa';
import './PerguntaTrilha4.css';

const Pergunta4 = () => {
  const trilhaId = 'desafios';
  const navigate = useNavigate();

  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const perguntasDesafios = [
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
    }
  ];

  const trilhaInfo = {
    nome: 'Explorador de Desafios',
    cor: 'from-yellow-400 to-amber-500',
    icone: <FaPuzzlePiece className="text-white text-2xl" />
  };

  const perguntas = perguntasDesafios;

  const selecionarResposta = (perguntaId, valor) => {
    setRespostas({ ...respostas, [perguntaId]: valor });
  };

  const proximaPergunta = () => {
    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      window.scrollTo(0, 0);
    } else {
      fetch('http://localhost:3001/respostas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trilha: trilhaId, respostas })
      })
        .then(res => res.json())
        .then(() => {
          fetch('http://localhost:3001/progresso', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trilha_id: trilhaId, progresso: 100 })
          });
        })
        .then(() => {
          navigate('/trilha/resultado', { state: { respostas, trilhaId } });
        })
        .catch(err => console.error('Erro ao salvar respostas', err));
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

export default Pergunta4;
