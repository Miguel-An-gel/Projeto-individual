const express = require("express");
const app = express();
const mysql = require("mysql");

app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dance_hero",
});

db.connect(err => {
    if (err) throw err;
    console.log("Banco conectado!");
});

app.post("/salvar-dados", (req, res) => {
    const { jogador, pontuacao, acertos, erros, precisao, totalNotas } = req.body;

    const query = `
        INSERT INTO jogadores (jogador, pontuacao, acertos, erros, precisao, total_notas) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [jogador, pontuacao, acertos, erros, precisao, totalNotas], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send("Dados salvos com sucesso!");
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000!"));
