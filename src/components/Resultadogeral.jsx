import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ResultadoGeral.css';

const mapeamentoPerguntas = {
  visual: {
    Estética: ['visual_1', 'visual_2'],
    Acessibilidade: ['visual_6', 'visual_7'],
  },
  jornada: {
    Learnability: ['jornada_3'],
    Operability: ['jornada_4', 'jornada_5'],
  },
  saberes: {
  Confiança: ['saberes_1'],
  Relevância: ['saberes_2', 'saberes_3', 'saberes_4'],
  Preferência: ['saberes_5']
},
  desafios: {
    Desafio: ['desafios_9', 'desafios_10', 'desafios_11'],
    Esforço: ['desafios_13'],
  },
  coracao: {
    Satisfação: ['coracao_1', 'coracao_2', 'coracao_4'],
    Esforço: ['coracao_3'],
    InteraçãoSocial: ['coracao_5'], // Supondo que haja, adapte se necessário
  },
  amizade: {
    InteraçãoSocial: ['amizade_16', 'amizade_17', 'amizade_18'],
  },
  diversao: {
    Diversão: ['diversao_19', 'diversao_20'],
    Atenção: ['diversao_21', 'diversao_22'],
  }
};

const ResultadoGeral = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const respostasTotais = location.state?.respostas || {};

  console.log('Respostas recebidas:', respostasTotais);

  const calcularConsenso = (respostas) => {
    const n = respostas.length;
    if (n === 0) return { consenso: '—', divergencia: '—', ex: '—' };

    const freq = {};
    respostas.forEach(val => {
      freq[val] = (freq[val] || 0) + 1;
    });

    const px = {};
    Object.keys(freq).forEach(key => {
      px[key] = freq[key] / n;
    });

    const ex = respostas.reduce((acc, val) => acc + val, 0) / n;
    const xmax = 5;
    const xmin = 1;

    let sum = 0;
    for (const valStr in px) {
      const xi = parseInt(valStr);
      const prob = px[valStr];
      const dif = Math.abs(xi - ex);
      const normalizado = 1 - (dif / (xmax - xmin));
      if (normalizado > 0) {
        sum += prob * Math.log2(normalizado);
      }
    }

    const consenso = +(1 + sum).toFixed(3);
    const divergencia = +(1 - consenso).toFixed(3);

    return {
      consenso: consenso < 0 ? 0 : consenso,
      divergencia: divergencia < 0 ? 0 : divergencia,
      ex: +ex.toFixed(2)
    };
  };

  return (
    <div className="resultado-geral-container">
      <h1>Resumo Geral da Avaliação</h1>

      {Object.entries(mapeamentoPerguntas).map(([trilha, dimensoes]) => (
        <div key={trilha} className="trilha-bloco">
          <h2>{trilha.toUpperCase()}</h2>
          <ul>
            {Object.entries(dimensoes).map(([dimensao, perguntas]) => {
              const respostas = perguntas
                .map(id => {
                  const valor = Number(respostasTotais[id]);
                  console.log(`Pergunta ${id}:`, valor);
                  return valor;
                })
                .filter(val => !isNaN(val));

              const { consenso, divergencia, ex } = calcularConsenso(respostas);

              return (
                <li key={dimensao}>
                  <strong>{dimensao}:</strong><br />
                  Esperança (E): {ex} | Consenso: {consenso} | Divergência: {divergencia}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <button onClick={() => navigate('/trilha')}>Voltar para Trilhas</button>
    </div>
  );
};

export default ResultadoGeral;
