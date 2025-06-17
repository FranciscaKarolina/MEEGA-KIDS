const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexão com banco
const db = new sqlite3.Database('./meegakids.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco meegakids.db');
  }
});

// Criação da tabela de respostas (caso ainda não exista)
db.run(`
  CREATE TABLE IF NOT EXISTS respostas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trilha TEXT,
    pergunta_id TEXT,
    resposta INTEGER,
    data_hora TEXT
  )
`);

// Criação da tabela de progresso (caso ainda não exista)
db.run(`
  CREATE TABLE IF NOT EXISTS progresso_trilha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trilha_id TEXT NOT NULL,
    usuario_id TEXT,
    progresso INTEGER NOT NULL DEFAULT 0,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Rota para salvar respostas
app.post('/respostas', (req, res) => {
  const { trilha, respostas } = req.body;

  const stmt = db.prepare(`
    INSERT INTO respostas (trilha, pergunta_id, resposta, data_hora)
    VALUES (?, ?, ?, datetime('now'))
  `);

  for (const [perguntaId, valor] of Object.entries(respostas)) {
    stmt.run(trilha, perguntaId, valor);
  }

  stmt.finalize();
  res.status(201).json({ message: 'Respostas salvas com sucesso!' });
});

// Rota para salvar ou atualizar progresso
app.post('/progresso', (req, res) => {
  const { trilha_id, usuario_id, progresso } = req.body;

  if (!trilha_id || progresso == null) {
    return res.status(400).json({ error: 'trilha_id e progresso são obrigatórios' });
  }

  db.get(`SELECT * FROM progresso_trilha WHERE trilha_id = ? AND usuario_id IS ?`, [trilha_id, usuario_id || null], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      // Atualizar
      db.run(
        `UPDATE progresso_trilha SET progresso = ?, atualizado_em = datetime('now') WHERE id = ?`,
        [progresso, row.id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Progresso atualizado com sucesso.' });
        }
      );
    } else {
      // Inserir novo
      db.run(
        `INSERT INTO progresso_trilha (trilha_id, usuario_id, progresso) VALUES (?, ?, ?)`,
        [trilha_id, usuario_id || null, progresso],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Progresso salvo com sucesso.' });
        }
      );
    }
  });
});

// Rota para buscar progresso por trilha
app.get('/progresso/:trilha_id', (req, res) => {
  const trilhaId = req.params.trilha_id;
  const usuarioId = req.query.usuario_id || null;

  db.get(
    `SELECT progresso FROM progresso_trilha WHERE trilha_id = ? AND usuario_id IS ?`,
    [trilhaId, usuarioId],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ progresso: row ? row.progresso : 0 });
    }
  );
});

// Rota padrão para testar servidor
app.get('/', (req, res) => {
  res.send('Servidor Meega+Kids está online 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
