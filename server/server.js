const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./users.db');
const PORT = 5000;
const JWT_SECRET = 'your_jwt_secret';

app.use(cors());
app.use(bodyParser.json());

// Create users table if it doesn't exist
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)");
});

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Registration endpoint
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).send('Error hashing password');
    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], function(err) {
      if (err) return res.status(500).send('Error inserting user');
      res.status(201).send('User registered');
    });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).send('Error fetching user');
    if (!user) return res.status(401).send('Invalid credentials');
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).send('Error comparing passwords');
      if (!result) return res.status(401).send('Invalid credentials');
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      res.json({ token });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
