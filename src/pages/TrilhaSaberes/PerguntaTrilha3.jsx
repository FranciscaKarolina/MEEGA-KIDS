import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaBook } from 'react-icons/fa';
import './Perguntatrilha3.css';

const Pergunta3 = () => {
  const trilhaId = 'saberes';
  const navigate = useNavigate();

  const [respostas, setRespostas] = useState({});
  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const perguntasSaberes = [
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
    icone: <FaBook className="text-white text-2xl" />
  };

  const perguntas = perguntasSaberes;

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
        .then(data => {
          console.log(data.message);
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

export default Pergunta3;
