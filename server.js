const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'karate'
});

conexao.connect(err => {
  if (err) throw err;
  console.log("✅ Conectado ao MySQL!");
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configurações de upload
const uploadFoto = multer({ dest: "uploads/fotos/" });
const uploadCertificado = multer({ dest: "uploads/certificados/" });

// Rota de cadastro
app.post("/cadastro", uploadFoto.single("foto"), (req, res) => {
  const {
    nome, nascimento, endereco, rg, cpf,
    mae, pai, telefone, whatsapp, instagram, facebook,
    tipo, graduacao, email, senha
  } = req.body;

  const foto = req.file ? req.file.filename : "";

  const filePath = "database/karate.xlsx";
  let data = [];

  if (fs.existsSync(filePath)) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Cadastro"];
    if (sheet) {
      data = XLSX.utils.sheet_to_json(sheet);
    }
  }

  data.push({
    Nome: nome,
    DataNascimento: nascimento,
    Endereço: endereco,
    RG: rg,
    CPF: cpf,
    Mãe: mae,
    Pai: pai,
    Telefone: telefone,
    WhatsApp: whatsapp,
    Instagram: instagram,
    Facebook: facebook,
    Tipo: tipo,
    Graduação: graduacao,
    Email: email,
    Senha: senha,
    Foto: foto
  });

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cadastro");
  XLSX.writeFile(workbook, filePath);

  res.send("✅ Cadastro realizado com sucesso!");
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const filePath = "database/karate.xlsx";

  if (!fs.existsSync(filePath)) return res.send("⛔ Banco de dados não encontrado.");

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets["Cadastro"];
  const data = XLSX.utils.sheet_to_json(sheet);

  const usuario = data.find(u => u.Email === email && u.Senha === senha);

  if (usuario) {
    res.redirect("/perfil.html"); // pode ser substituído por rota protegida
  } else {
    res.send("❌ Email ou senha incorretos.");
  }
});

// Upload de certificado
app.post("/upload-certificado", uploadCertificado.single("certificado"), (req, res) => {
  const { nome } = req.body;
  const arquivo = req.file ? req.file.filename : "";

  const filePath = "database/karate.xlsx";
  let certData = [];

  if (fs.existsSync(filePath)) {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets["Certificados"];
    if (sheet) {
      certData = XLSX.utils.sheet_to_json(sheet);
    }
  }

  certData.push({
    Aluno: nome,
    Arquivo: arquivo,
    Data: new Date().toLocaleDateString()
  });

  const worksheet = XLSX.utils.json_to_sheet(certData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Certificados");
  XLSX.writeFile(workbook, filePath);

  res.send(`📄 Certificado de ${nome} enviado com sucesso.`);
});

// Listagem de certificados
app.get("/certificados", (req, res) => {
  const pasta = path.join(__dirname, "uploads/certificados");

  fs.readdir(pasta, (err, arquivos) => {
    if (err) return res.send("❌ Erro ao listar certificados.");

    let html = "<h2>📁 Certificados Disponíveis:</h2><ul>";
    arquivos.forEach(file => {
      html += `<li><a href="/uploads/certificados/${file}" download>${file}</a></li>`;
    });
    html += "</ul>";

    res.send(html);
  });
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`🥋 Servidor ativo em http://localhost:${PORT}`);
});