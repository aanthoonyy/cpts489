const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = new sqlite3.Database('./petition.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS signers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      city TEXT,
      state TEXT
    )
  `);
});

app.get('/api/signers', (req, res) => {
  db.all('SELECT * FROM signers', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'err' });
    }
    res.json(rows);
  });
});

app.post('/petition', (req, res) => {
  const { name, email, city, state } = req.body;

  db.run(
    'INSERT INTO signers (name, email, city, state) VALUES (?, ?, ?, ?)',
    [name, email, city, state],
    function (err) {
      if (err) {
        return res.status(500).json({ error: 'err' });
      }
      res.json({ id: this.lastID });
    },
  );
});

app.listen(port);
