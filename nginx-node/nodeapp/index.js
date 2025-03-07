const express = require("express");
const mysql = require("mysql2");

const app = express();
const port = 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "fullcycle"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");

  // Criar a tabela se não existir
  const sql = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`;
  db.query(sql, (err) => {
    if (err) console.error("Erro ao criar tabela:", err);
  });
});

// Rota principal
app.get("/", (req, res) => {
  const name = "Full Cycle";
  const insertSql = `INSERT INTO people(name) VALUES('${name}')`;
  
  db.query(insertSql, (err) => {
    if (err) {
      console.error("Erro ao inserir dado:", err);
      return res.status(500).send("Erro ao inserir dado.");
    }

    db.query("SELECT * FROM people", (err, results) => {
      if (err) {
        console.error("Erro ao buscar dados:", err);
        return res.status(500).send("Erro ao buscar dados.");
      }

      let namesList = results.map(person => `<li>${person.name}</li>`).join("");
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
