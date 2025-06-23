import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaCircle, FaEnvelope, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        senha: password.trim(),
      });

      const data = response.data;

      localStorage.setItem('usuario_id', data.usuario.id);
      localStorage.setItem('nome_usuario', data.usuario.nome);
      
      navigate('/trilha');
    } catch (err) {
      alert(err.response?.data?.error || 'Credenciais inválidas!');
    }
  };

  return (
    <div className='login-wrapper'>
      <div className="login-container bg-pattern"> 
        {/* lado esquerdo */}
        <div className="left-side">
          <div className='logo-container'>
            <div className='logo'>MEEGA+KIDS</div>
          </div>
          
          <div className='welcome-text'>
            <h1>Bem-vindo ao mundo da diversão!</h1>
            <p>Avaliar jogos nunca foi tão divertido</p>
          </div>

          <div className='floating-elements'>
            <div className="floating-element element-1">
              <FaCheckCircle className="icon-large success" />
            </div>
            <div className="floating-element element-2">
              <FaCircle className="icon-large neutral" />
            </div>
            <div className="floating-element element-3">
              <FaTimesCircle className="icon-large danger" />
            </div>
            <div className="floating-element element-4">
              <div className="shape-circle"></div>
            </div>
          </div>
        </div>

        {/* lado direito */}
        <div className='right-side'>
          <div className='login-box'>
            <h1 className='title'>Entrar na Aventura</h1>
            <p className='subtitle'>Faça login para continuar sua jornada</p>

            <div className='input-container'>
              <FaEnvelope className='input-icon' />
              <input
                className='input'
                type='email'
                placeholder='seu-email@exemplo.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='input-container'>
              <FaLock className='input-icon' />
              <input
                className="input"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className='remember-forget'>
              <label className='remember-label'>
                <input
                  type='checkbox'
                  checked={rememberMe}
                  onChangeCapture={(e) => setRememberMe(e.target.checked)}
                />
                <span>Lembrar de mim</span>
              </label>
              <a className='forgot-link' href="#">Esqueceu a senha?</a>
            </div>

            <button className='button' onClick={handleLogin}>Entrar na Aventura</button>

            <div className='signup-link'>
              <a className="forgot-link" href="#">Esqueceu sua senha?</a>
              <a className="create-account-link" href="/criar-conta">Criar conta</a>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
