const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    host: 'localhost', // MySQL zerbitzariaren helbidea
    user: 'root', // MySQL erabiltzailea
    password: '', // MySQL pasahitza
    database: 'autoak', // Datu-basearen izena
    port: '3307' , // Portua 
});


db.connect((err) => {
    if (err) {
        console.error('Errorea datu-basera konektatzean:', err);
        return;
    }
    console.log('Datu-basera konektatuta');
});


// // Endpoints CRUD
app.get('/autoak', (req, res) => {
    const query = 'SELECT * FROM modeloak';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.post('/autoak/create', (req, res) => {
    const newUser = req.body;
  
    const query = `
      INSERT INTO modeloak 
      (id,marka,modeloa) 
      VALUES (?, ?, ?)
    `;
  
    const values = [
      newUser.id,
      newUser.marka,
      newUser.modeloa,
    ];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al crear el Autoa:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Usuario creado correctamente', id: results.insertId });
    });
  });

  app.put('/autoak/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedMarka = req.marka;
    const updatedModeloa = req.modeloa;
  
    const query = `
      UPDATE modeloak 
      SET 
        marka = ?,
        modeloa =?

      WHERE id = ?
    `;
  
    const values = [
        updatedMarka,
        updatedModeloa,
        userId,
    ];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al actualizar el autoa:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  });

  app.delete('/autoak/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM modeloak WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// Zerbitzaria hasieratu
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Zerbitzaria http://localhost:${PORT} -n martxan dago`);
});
