// src/components/PerguntaBase.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import '../styles/Pergunta.css';

const PerguntaBase = ({ trilhaId, trilhaInfo, perguntas }) => {
  const navigate = useNavigate();
  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  useEffect(() => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      navigate('/login');
    }
  }, []);

  const salvarProgresso = async (progresso) => {
    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) return;

    await fetch('http://localhost:3001/progresso', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trilha_id: trilhaId, usuario_id, progresso })
    });
  };

  const selecionarResposta = (perguntaId, valor) => {
    const novasRespostas = { ...respostas, [perguntaId]: valor };
    setRespostas(novasRespostas);

    const respondidas = Object.keys(novasRespostas).length;
    const progresso = Math.round((respondidas / perguntas.length) * 100);
    if (progresso < 100 && progresso > 0) {
      salvarProgresso(progresso); // salva conforme avança
    }
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
      }).then(() => {
        salvarProgresso(100).then(async () => {
          const usuario_id = localStorage.getItem('usuario_id');
          await fetch('http://localhost:3001/medalhas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id, trilha_id: trilhaId })
          });
          navigate('/resultado-geral', { state: { respostas } }); // caminho correto

        });
      });
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) setPerguntaAtual(perguntaAtual - 1);
    else navigate('/trilha');
  };

  useEffect(() => {
    return () => {
      const usuario_id = localStorage.getItem('usuario_id');
      const respondidas = Object.keys(respostas).length;
      const progresso = Math.round((respondidas / perguntas.length) * 100);
      if (usuario_id && progresso < 100 && progresso > 0) {
        fetch('http://localhost:3001/progresso', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ trilha_id: trilhaId, usuario_id, progresso })
        });
      }
    };
  }, [perguntas.length, respostas, trilhaId]);

  if (!perguntas || perguntas.length === 0) {
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
    <div className="pergunta-container">
      <div className="trilha-perguntas-container">
        <header className="trilha-perguntas-header">
          <div className="header-content">
            <button className="btn-voltar" onClick={() => navigate('/trilha')}>
              <FaArrowLeft /> Voltar às Trilhas
            </button>
            <div className={`trilha-badge bg-gradient-to-r ${trilhaInfo.cor}`}>
              <span className="trilha-badge-icon">{trilhaInfo.icone}</span>
              <span className="trilha-badge-texto">{trilhaInfo.nome}</span>
            </div>
            <span className="progresso-texto">Pergunta {perguntaAtual + 1} de {perguntas.length}</span>
          </div>
        </header>

        <main className="trilha-perguntas-content">
          <div className="progresso-barra">
            <div className="progresso-preenchido" style={{ width: `${((perguntaAtual + 1) / perguntas.length) * 100}%` }} />
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
                    {valor === 1 ? '😕' : valor === 2 ? '🙁' : valor === 3 ? '😐' : valor === 4 ? '🙂' : '😄'}
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

export default PerguntaBase;
