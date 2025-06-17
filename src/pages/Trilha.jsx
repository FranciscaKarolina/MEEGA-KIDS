// Adições necessárias para o progresso funcionar
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaRoute, FaBook, FaPuzzlePiece, FaHeart, FaUsers, FaGamepad, FaBullseye } from 'react-icons/fa';
import "./Trilha.css";

const Trilhas = () => {
  const navigate = useNavigate();
  const [progresso, setProgresso] = useState({});

  useEffect(() => {
    fetch("http://localhost:3001/progresso")
      .then(res => res.json())
      .then(data => {
        const progressoMap = {};
        data.forEach(item => {
          progressoMap[item.trilha_id] = item.progresso;
        });
        setProgresso(progressoMap);
      });
  }, []);

  const trilhas = [
    {
      id: "visual",
      nome: "Guardião do Visual",
      descricao: "Avalie a qualidade e estética do jogo",
      icone: <FaEye />, cor: "from-blue-500 to-cyan-400"
    },
    { id: "jornada", nome: "Mestre da Jornada", descricao: "Analise a narrativa e progressão do jogo", icone: <FaRoute />, cor: "from-purple-500 to-indigo-500" },
    { id: "saberes", nome: "Caçador de Saberes", descricao: "Avalie o conteúdo educacional e aprendizado", icone: <FaBook />, cor: "from-green-500 to-emerald-400" },
    { id: "desafios", nome: "Explorador de Desafios", descricao: "Analise os desafios e a dificuldade do jogo", icone: <FaPuzzlePiece />, cor: "from-yellow-400 to-amber-500" },
    { id: "coracao", nome: "Coração Valente", descricao: "Avalie o impacto emocional e engajamento", icone: <FaHeart/>, cor: "from-red-500 to-pink-500" },
    { id: "amizade", nome: "Herói da Amizade", descricao: "Analise os aspectos sociais e colaborativos", icone: <FaUsers />, cor: "from-indigo-400 to-blue-600" },
    { id: "diversao", nome: "Mestre da Diversão", descricao: "Analise o nível de diversão e entretenimento", icone: <FaGamepad/>, cor: "from-orange-400 to-red-400" },
    { id: "foco", nome: "Guardião do Foco", descricao: "Analise a capacidade de manter a atenção", icone: <FaBullseye/>, cor: "from-teal-400 to-green-500" },
  ];

  const navegarParaTrilha = (trilhaId) => {
    navigate(`/trilha/${trilhaId}/perguntas`);
  };

  return (
    <div className="trilhas-container">
      <header className="trilhas-header">
        <div className="header-content">
          <div className="logo">MEEGA+KIDS</div>
          <div className="user-info">
            <span>Olá, Avaliador</span>
            <button className="logout-btn">Sair</button>
          </div>
        </div>
      </header>

      <main className="trilhas-content">
        <div className="trilhas-intro">
          <h1>Escolha sua Trilha de Avaliação</h1>
          <p>Selecione uma das trilhas abaixo para começar a avaliar o jogo</p>
        </div>

        <div className="trilhas-grid">
          {trilhas.map((trilha) => {
            const progressoAtual = progresso[trilha.id] || 0;
            return (
              <div key={trilha.id} className="trilha-card" onClick={() => navegarParaTrilha(trilha.id)}>
                <div className={`trilha-icon-container bg-gradient-to-br ${trilha.cor}`}>
                  <div className="trilha-icon">{trilha.icone}</div>
                </div>
                <h2 className="trilha-titulo">{trilha.nome}</h2>
                <p className="trilha-descricao">{trilha.descricao}</p>
                <div className="trilha-progresso">
                  <div className="progresso-barra">
                    <div className="progresso-preenchido" style={{ width: `${progressoAtual}%` }}></div>
                  </div>
                  <span className="progresso-texto">{progressoAtual}% concluído</span>
                </div>
                <button className="trilha-btn">Iniciar Avaliação</button>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="trilhas-footer">
        <p>© 2025 MEEGA+KIDS - Sistema de Avaliação Ludificado</p>
      </footer>
    </div>
  );
};

export default Trilhas;
