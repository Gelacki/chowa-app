// Importando os pacotes
const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // acessa HTML e CSS da pasta public

// Conexão com MySQL
const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'SUA_SENHA',
  database: 'karate'
});
conexao.connect(err => {
  if (err) throw err;
  console.log("✅ Conectado ao MySQL!");
});

// Configuração do Multer para foto
const storageFoto = multer.diskStorage({
  destination: 'uploads/fotos/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const uploadFoto = multer({ storage: storageFoto });

// Configuração do Multer para certificado
const storageCertificado = multer.diskStorage({
  destination: 'uploads/certificados/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const uploadCertificado = multer({ storage: storageCertificado });

// Rota de cadastro com foto
app.post("/cadastro", uploadFoto.single("foto"), (req, res) => {
  const dados = req.body;
  dados.foto = req.file.filename;
  const sql = "INSERT INTO usuarios SET ?";
  conexao.query(sql, dados, (err) => {
    if (err) return res.status(500).send("Erro ao cadastrar");
    res.send("✅ Cadastro realizado!");
  });
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
  conexao.query(sql, [email, senha], (err, results) => {
    if (err) return res.status(500).send("Erro no login");
    if (results.length === 0) return res.status(401).send("Credenciais inválidas");
    res.send("✅ Login autorizado!");
  });
});

// Rota para envio de certificado
app.post("/upload-certificado", uploadCertificado.single("certificado"), (req, res) => {
  const { nome } = req.body;
  const arquivo = req.file.filename;
  const sqlBusca = "SELECT id FROM usuarios WHERE nome = ?";
  conexao.query(sqlBusca, [nome], (err, results) => {
    if (err || results.length === 0) return res.status(400).send("Usuário não encontrado");
    const aluno_id = results[0].id;
    const sql = "INSERT INTO certificados SET ?";
    conexao.query(sql, { aluno_id, arquivo, data_envio: new Date() }, err2 => {
      if (err2) return res.status(500).send("Erro ao salvar certificado");
      res.send("✅ Certificado enviado!");
    });
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});