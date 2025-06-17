import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import CriarConta from "./pages/CriarConta";
import Trilha from "./pages/Trilha";
import Pergunta1 from "./pages/TrilhaVisual/Pergunta1";
import Resultado from "./pages/resultado";
import Pergunta2 from "./pages/TrilhaJornada/PerguntaTrilha2";
import Pergunta3 from "./pages/TrilhaSaberes/PerguntaTrilha3";
import Pergunta4 from "./pages/TrilhaDesafios/PerguntaTrilha4"
import Pergunta5 from "./pages/TrilhaCoracao/PerguntaTrilha5";
import Pergunta6 from "./pages/TrilhaAmizade/PerguntaTrilha6";
import Pergunta7 from "./pages/TrilhaDiversao/PerguntaTrilha7";

function App() {
  console.log("App está sendo renderizado");
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <header>
            <h1>Meega+Kids</h1>
            <p>Sistema de Teste de Jogos</p>
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/criar-conta" element={<CriarConta/>} />
              <Route path="/trilha" element={<Trilha />} />
              <Route path="/trilha/resultado" element={<Resultado />} />
              <Route path="/trilha/:trilhaId/perguntas" element={<Pergunta1 />} />
              <Route path="/trilha/jornada/perguntas" element={<Pergunta2 />} />
              <Route path="/trilha/saberes/perguntas" element={<Pergunta3 />} />
              <Route path="/trilha/desafios/perguntas" element={<Pergunta4 />} />
              <Route path="/trilha/coracao/perguntas" element={<Pergunta5 />} />
              <Route path="/trilha/amizade/perguntas" element={<Pergunta6 />} />
              <Route path="/trilha/diversao/perguntas" element={<Pergunta7 />} />
            
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App