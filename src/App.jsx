import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import Trilha from "./pages/Trilha";
import Pergunta1 from "./pages/TrilhaVisual/Pergunta1";
import Resultado from "./pages/resultado";
import ResultadoGeral from "./components/Resultadogeral";
import Pergunta2 from "./pages/TrilhaJornada/PerguntaTrilha2";
import Pergunta3 from "./pages/TrilhaSaberes/PerguntaTrilha3";
import Pergunta4 from "./pages/TrilhaDesafios/PerguntaTrilha4";
import Pergunta5 from "./pages/TrilhaCoracao/PerguntaTrilha5";
import Pergunta6 from "./pages/TrilhaAmizade/PerguntaTrilha6";
import Pergunta7 from "./pages/TrilhaDiversao/PerguntaTrilha7";
import Perfil from "./components/Perfil";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/criar-conta' || location.pathname.startsWith('/trilha') || location.pathname === '/resultado-geral';
  const renderHeader = !location.pathname.startsWith('/trilha'); // esconde header em /trilha

  return ( 
    <div className="App">
      {!isAuthPage && (
        <header className="header-global">
          <h1>Meega+Kids</h1>
          <p>Sistema de Teste de Jogos</p>
        </header>
      )}

      <div className={`content ${!isAuthPage ? 'with-global-header' : ''}`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/criar-conta" element={<CriarConta />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/trilha/resultado" element={<Resultado />} />
          <Route path="/trilha/:trilhaId/perguntas" element={<Pergunta1 />} />
          <Route path="/trilha/jornada/perguntas" element={<Pergunta2 />} />
          <Route path="/trilha/saberes/perguntas" element={<Pergunta3 />} />
          <Route path="/trilha/desafios/perguntas" element={<Pergunta4 />} />
          <Route path="/trilha/coracao/perguntas" element={<Pergunta5 />} />
          <Route path="/trilha/amizade/perguntas" element={<Pergunta6 />} />
          <Route path="/trilha/diversao/perguntas" element={<Pergunta7 />} />
          <Route path="/perfil" element={<Perfil/>}/>
          <Route path="/Resultado-geral" element={<ResultadoGeral/>}/>
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
