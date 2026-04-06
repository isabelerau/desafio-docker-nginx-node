const express = require('express')
const app = express()
const port = 3000
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};
const mysql = require('mysql2');
const connection = mysql.createConnection(config)

connection.query(
  `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))`,
  (err) => {
    if (err) throw err;
    connection.query(`INSERT INTO people(name) values ('Isabele')`, (err) => {
      if (err) throw err;
      console.log('Dados inseridos com sucesso!');
    });
  }
);

app.get('/', (req, res) => {
  connection.query(`SELECT name FROM people`, (err, results) => {
    if (err) throw err;
    const names = results.map(r => `<li>${r.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${names}</ul>`);
  });
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`)
})