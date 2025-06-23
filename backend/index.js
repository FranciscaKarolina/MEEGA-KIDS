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
//Criação de tabela de usuários
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

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

// Criação da tabela de progresso
db.run(`
  CREATE TABLE IF NOT EXISTS progresso_trilha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trilha_id TEXT NOT NULL,
    usuario_id TEXT,
    progresso INTEGER NOT NULL DEFAULT 0,
    atualizado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
// Tabela medalhas
db.run(`
  CREATE TABLE IF NOT EXISTS medalhas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id TEXT,
    trilha_id TEXT,
    conquistada_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
// Tabela para armazenar os resultados por dimensão
db.run(`
  CREATE TABLE IF NOT EXISTS resultados_dimensao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id TEXT NOT NULL,
    trilha_id TEXT NOT NULL,
    dimensao TEXT NOT NULL,
    ex REAL, -- esperança matemática
    consenso REAL,
    divergencia REAL,
    registrado_em DATETIME DEFAULT CURRENT_TIMESTAMP
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

  if (!trilha_id || !usuario_id || progresso == null) {
    return res.status(400).json({ error: 'Dados incompletos para salvar progresso.' });
  }

  db.get(
    `SELECT * FROM progresso_trilha WHERE trilha_id = ? AND usuario_id = ?`,
    [trilha_id, usuario_id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (row) {
        // Atualiza progresso existente
        db.run(
          `UPDATE progresso_trilha SET progresso = ?, atualizado_em = datetime('now') WHERE trilha_id = ? AND usuario_id = ?`,
          [progresso, trilha_id, usuario_id],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Progresso atualizado com sucesso.' });
          }
        );
      } else {
        // Insere novo progresso
        db.run(
          `INSERT INTO progresso_trilha (trilha_id, usuario_id, progresso) VALUES (?, ?, ?)`,
          [trilha_id, usuario_id, progresso],
          function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Progresso salvo com sucesso!' });
          }
        );
      }
    }
  );
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

// ✅ Rota para buscar todos os progressos de um usuário
app.get('/progresso', (req, res) => {
  const usuarioId = req.query.usuario_id;

  if (!usuarioId) {
    return res.status(400).json({ error: 'ID do usuário não fornecido.' });
  }

  db.all(
    `SELECT trilha_id, progresso FROM progresso_trilha WHERE usuario_id = ?`,
    [usuarioId],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows); // [{ trilha_id: 'visual', progresso: 100 }, ...]
    }
  );
});


//Rota para cadastrar usuário
app.post('/usuarios', (req, res) => {
  const { nome, email, senha, avatar } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  db.run(
    `INSERT INTO usuarios (nome, email, senha, avatar) VALUES (?, ?, ?, ?)`,
    [nome, email, senha, avatar],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ error: 'Email já cadastrado.' });
        }
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Usuário criado com sucesso!', id: this.lastID });
    }
  );
});

// Adiciona a coluna avatar se ainda não existir
db.all("PRAGMA table_info(usuarios)", (err, rows) => {
  if (err) return console.error("Erro ao buscar estrutura da tabela:", err.message);

  const colunas = rows.map(row => row.name);
  if (!colunas.includes("avatar")) {
    db.run(`ALTER TABLE usuarios ADD COLUMN avatar TEXT`, (err) => {
      if (err) {
        console.error("Erro ao adicionar coluna avatar:", err.message);
      } else {
        console.log("Coluna 'avatar' adicionada com sucesso.");
      }
    });
  }
});

//Rota para login com e-mail e senha
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
  }

  db.get(`SELECT * FROM usuarios WHERE email = ? AND senha = ?`, [email, senha], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas.' });

    res.json({ message: 'Login realizado com sucesso.', 
      usuario:{
        id: user.id,
        nome: user.nome,
        email: user.email
      } 
    });
  });
});
// Rota para listar medalhas do usuário
app.post('/medalhas', (req, res) => {
  const { usuario_id, trilha_id } = req.body;

  db.get(
    `SELECT * FROM medalhas WHERE usuario_id = ? AND trilha_id = ?`,
    [usuario_id, trilha_id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (row) return res.status(200).json({ message: 'Medalha já conquistada.' });

      db.run(
        `INSERT INTO medalhas (usuario_id, trilha_id) VALUES (?, ?)`,
        [usuario_id, trilha_id],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'Medalha registrada com sucesso!' });
        }
      );
    }
  );
});
//Rota exibir medalha
app.get('/medalhas/:usuario_id', (req, res) => {
  const usuario_id = req.params.usuario_id;

  db.all(
    `SELECT trilha_id, conquistada_em FROM medalhas WHERE usuario_id = ?`,
    [usuario_id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// Rota padrão para testar servidor
app.get('/', (req, res) => {
  res.send('Servidor Meega+Kids está online 🚀');
});

// Rota para salvar resultado de uma dimensão
app.post('/resultado-dimensao', (req, res) => {
  const { usuario_id, trilha_id, dimensao, ex, consenso, divergencia } = req.body;

  if (!usuario_id || !trilha_id || !dimensao || ex == null || consenso == null || divergencia == null) {
    return res.status(400).json({ error: 'Dados incompletos para salvar resultado da dimensão.' });
  }

  db.run(
    `INSERT INTO resultados_dimensao (usuario_id, trilha_id, dimensao, ex, consenso, divergencia)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [usuario_id, trilha_id, dimensao, ex, consenso, divergencia],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Resultado da dimensão salvo com sucesso!' });
    }
  );
});

// Rota para buscar dados do usuário (incluindo avatar)
app.get('/usuario/:id', (req, res) => {
  const id = req.params.id;

  db.get(`SELECT nome, email, avatar FROM usuarios WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Usuário não encontrado.' });

    res.json(row);
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
