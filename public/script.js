function carregarFaixa(faixa) {
  const faixas = {
    branca: {
      titulo: "Faixa Branca",
      tecnicas: ["Zenkutsu Dachi", "Oi Tsuki", "Mae Geri"],
      imagem: "img/faixa-branca.png",
      video: "https://www.youtube.com/embed/VIDEO_ID1",
      audio: "materiais/audio-branca.mp3",
      pdf: "materiais/branca.pdf"
    },
    preta1: {
      titulo: "Faixa Preta 1º Dan",
      tecnicas: ["Kata Heian Godan", "Kumite Avançado"],
      imagem: "img/faixa-preta.png",
      video: "https://www.youtube.com/embed/VIDEO_ID2",
      audio: "materiais/audio-preta1.mp3",
      pdf: "materiais/preta1.pdf"
    }
  };

  const f = faixas[faixa];
  document.getElementById("conteudo-faixa").innerHTML = `
    <h3>${f.titulo}</h3>
    <ul>${f.tecnicas.map(t => `<li>${t}</li>`).join("")}</ul>
    <img src="${f.imagem}" width="100" />
    <iframe src="${f.video}" allowfullscreen></iframe>
    <audio controls src="${f.audio}"></audio>
    <p><a href="${f.pdf}" target="_blank">📄 Baixar PDF</a></p>
  `;
}