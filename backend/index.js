const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    host: '10.5.104.21', // MySQL zerbitzariaren helbidea
    user: 'iker', // MySQL erabiltzailea
    password: '', // MySQL pasahitza
    database: 'calendar', // Datu-basearen izena
    port: '3307' , // Portua 
});


db.connect((err) => {
    if (err) {
        console.error('Errorea datu-basera konektatzean:', err);
        return;
    }
    console.log('Datu-basera konektatuta');
});


// Endpoints CRUD
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/horarios', (req, res) => {
    const profeId = req.query.profe_id;
    if (!profeId) {
      return res.status(400).send('El parámetro profe_id es obligatorio.');
    }
  
    const query = 'SELECT * FROM horarios WHERE profe_id = ?';
    db.query(query, [profeId], (err, results) => {
      if (err) {
        console.error('Error al obtener los horarios:', err);
        return res.status(500).send('Error interno del servidor');
      }
  
      res.send(results);
    });
});
  


app.post('/users', (req, res) => {
    const newItem = req.body;
    const query = 'INSERT INTO users SET ?';
    db.query(query, newItem, (err, results) => {
        if (err) throw err;
        res.send({ id: results.insertId, ...newItem });
    });
});


app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    const query = 'UPDATE users SET ? WHERE id = ?';
    db.query(query, [updatedItem, id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
  
    // Verifica que el email y la contraseña coincidan
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Database error', error: err });
        return;
      }
  
      if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.json({ success: false, message: 'Invalid email or password' });
      }
    });
});


// Zerbitzaria hasieratu
const PORT = 3300;
app.listen(PORT, 'localhost', () => {
    console.log(`Zerbitzaria martxan dago eta konektagarria da: http://localhost:${PORT}`);
});

