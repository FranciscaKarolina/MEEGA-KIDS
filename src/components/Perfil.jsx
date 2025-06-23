import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

const avatarMap = {
  raposa: 'avatar1.png',
  macaco: 'avatar2.png',
  tigre: 'avatar3.png',
  panda: 'avatar4.png'
};

const Perfil = () => {
  const [medalhas, setMedalhas] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuario_id = localStorage.getItem('usuario_id');
    const nome = localStorage.getItem('nome_usuario');
    if (!usuario_id) return navigate('/login');
    setNomeUsuario(nome);

    // Buscar avatar
    fetch(`http://localhost:3001/usuario/${usuario_id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Avatar recebido:', data.avatar); //
        if (data?.avatar) {
          setAvatar(data.avatar);
        }
      });

    // Buscar medalhas
    fetch(`http://localhost:3001/medalhas/${usuario_id}`)
      .then(res => res.json())
      .then(data => setMedalhas(data));
  }, []);

  const trilhasNomes = {
    visual: "Guardião do Visual",
    jornada: "Mestre da Jornada",
    saberes: "Caçador de Saberes",
    desafios: "Explorador de Desafios",
    coracao: "Coração Valente",
    amizade: "Herói da Amizade",
    diversao: "Mestre da Diversão",
    foco: "Guardião do Foco"
  };

  const getIconePorTrilha = (trilhaId) => {
    const icones = {
      visual: '🎨',
      jornada: '🗺️',
      saberes: '📚',
      desafios: '🧩',
      coracao: '❤️',
      amizade: '🤝',
      diversao: '🎮',
      foco: '🎯',
    };
    return icones[trilhaId] || '🏅';
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className="perfil-container with-global-header">
        <h2>👤 {nomeUsuario}</h2>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </div>

      <div className="perfil-container">
        <h1>Perfil de {nomeUsuario}</h1>

        {/* Avatar do usuário */}
        {avatar && avatarMap[avatar] && (
          <div className="avatar-perfil">
            <img src={`/avatar/${avatarMap[avatar]}`} alt="Avatar do usuário" className="avatar-imagem" />
          </div>
        )}

        <h2>🏅 Medalhas Conquistadas</h2>
        {medalhas.length === 0 ? (
          <p>Você ainda não conquistou nenhuma medalha.</p>
        ) : (
          <div className="medalhas-grid">
            {medalhas.map((medalha, index) => (
              <div key={index} className="medalha-card">
                <span className="medalha-icone">{getIconePorTrilha(medalha.trilha_id)}</span>
                <p>{trilhasNomes[medalha.trilha_id] || medalha.trilha_id}</p>
                <small>{new Date(medalha.conquistada_em).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}

        <button className="btn-voltar" onClick={() => navigate('/trilha')}>
          ← Voltar às Trilhas
        </button>
      </div>
    </>
  );
};

export default Perfil;
