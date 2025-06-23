import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './Conta.css';
import AvatarSeletor from "../components/AvatarSeletor.jsx";

function CriarConta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [avatar, setAvatar] = useState('panda');

  const handleCriarConta = async () => {
    try {
      const response = await axios.post('http://localhost:3001/usuarios', {
        nome, email, senha, avatar
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Erro ao criar conta.');
    }
  };

  return (
    <div className="criar-conta-wrapper">
      <div className="criar-conta-container">
        <div className="criar-conta-box">
          <h1 className="criar-conta-title">Criar Conta</h1>
          <p className="criar-conta-subtitle">Preencha os dados para começar sua aventura</p>

          <div className="criar-conta-input-container">
            <input
              className="criar-conta-input"
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="criar-conta-input-container">
            <input
              className="criar-conta-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="criar-conta-input-container">
            <input
              className="criar-conta-input"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <h3 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Escolha seu avatar:</h3>
          <AvatarSeletor selectedAvatar={avatar} onSelect={setAvatar} />

          <button className="criar-conta-button" onClick={handleCriarConta}>Criar Conta</button>

          <div className="criar-conta-signup-link">
            <p>Já tem uma conta?</p>
            <Link className="criar-conta-voltar-link" to="/login">Voltar para Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarConta;
