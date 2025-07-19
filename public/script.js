function abrirMateria(faixa) {
  const materias = {
    branca: {
      titulo: "Faixa Branca",
      conteudo: ["Zenkutsu Dachi", "Oi Tsuki", "Mae Geri"],
      imagem: "img/faixa-branca.png",
      video: "https://www.youtube.com/embed/VIDEOID",
      audio: "materiais/audio-branca.mp3",
      pdf: "materiais/branca.pdf"
    },
    preta_1: {
      titulo: "Faixa Preta – 1º Dan",
      conteudo: ["Kata Heian Godan", "Kumite Avançado"],
      imagem: "img/faixa-preta-1dan.png",
      video: "https://www.youtube.com/embed/VIDEOID2",
      audio: "materiais/audio-preta1.mp3",
      pdf: "materiais/preta-1dan.pdf"
    }
  };

  const faixaData = materias[faixa];
  const container = document.getElementById("materia-container");
  container.innerHTML = `
    <h3>${faixaData.titulo}</h3>
    <img src="${faixaData.imagem}" width="100"><br>
    <ul>${faixaData.conteudo.map(t => `<li>${t}</li>`).join("")}</ul>
    <audio controls src="${faixaData.audio}"></audio><br>
    <iframe width="100%" height="315" src="${faixaData.video}" frameborder="0"></iframe><br>
    <a href="${faixaData.pdf}" class="btn" target="_blank">📥 Baixar PDF</a>
  `;
}

// Remova o código abaixo deste arquivo e coloque-o em seu arquivo de backend Node.js (por exemplo, server.js ou app.js)
// app.get("/cadastro", (req, res) => {
//   if (req.session.tipo !== "Professor") {
//     return res.send("⛔ Acesso negado.");
//   }
//   res.sendFile(path.join(__dirname, "public/cadastro.html"));
// });