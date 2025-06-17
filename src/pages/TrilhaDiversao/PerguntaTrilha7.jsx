import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaGamepad } from 'react-icons/fa';
import './PerguntaTrilha7.css';

const Pergunta7 = () => {
  const trilhaId = 'diversao';
  const navigate = useNavigate();

  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const perguntasDiversao = [
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
    icone: <FaGamepad className="text-white text-2xl" />
  };

  const perguntas = perguntasDiversao;

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
          })
            .then(() => {
              navigate('/trilha/resultado', { state: { respostas, trilhaId } });
            })
            .catch(err => console.error('Erro ao salvar progresso', err));
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

export default Pergunta7;
