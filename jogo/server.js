// server.js
const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dance_creator"
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// Create: Salva a coreografia criada pelo jogador
app.post("/api/choreographies", (req, res) => {
    const { player_name, steps } = req.body;
    const query = "INSERT INTO choreographies (player_name, steps) VALUES (?, ?)";
    db.query(query, [player_name, JSON.stringify(steps)], (err) => {
        if (err) throw err;
        res.send("Coreografia salva com sucesso!");
    });
});

// Read: Mostra coreografias salvas
app.get("/api/choreographies", (req, res) => {
    db.query("SELECT * FROM choreographies", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update: Atualiza uma coreografia
app.put("/api/choreographies/:id", (req, res) => {
    const { steps } = req.body;
    const { id } = req.params;
    const query = "UPDATE choreographies SET steps = ? WHERE id = ?";
    db.query(query, [JSON.stringify(steps), id], (err) => {
        if (err) throw err;
        res.send("Coreografia atualizada com sucesso!");
    });
});

// Delete: Exclui uma coreografia
app.delete("/api/choreographies/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM choreographies WHERE id = ?", [id], (err) => {
        if (err) throw err;
        res.send("Coreografia excluída com sucesso!");
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
