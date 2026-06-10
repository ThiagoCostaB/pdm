const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let filmes = [
  {
    id: 1,
    titulo: "Interestelar",
    ano: "2014",
    genero: "Ficção",
    descricao: "Viagem pelo espaço",
    avaliacao: 5,
    imagem: "https://picsum.photos/200/300"
  }
];

app.get("/filmes", (req, res) => {
  res.json(filmes);
});

app.post("/filmes", (req, res) => {
  const novoFilme = {
    id: Date.now(),
    ...req.body,
  };

  filmes.push(novoFilme);

  res.status(201).json(novoFilme);
});

app.put("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);

  filmes = filmes.map((filme) =>
    filme.id === id
      ? { ...filme, ...req.body }
      : filme
  );

  res.json({ mensagem: "Atualizado" });
});

app.delete("/filmes/:id", (req, res) => {
  const id = Number(req.params.id);

  filmes = filmes.filter(
    (filme) => filme.id !== id
  );

  res.json({ mensagem: "Removido" });
});

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});