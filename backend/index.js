const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
// const pool = require('./db');


const app = express();
app.use(cors());
app.use(bodyParser.json());


//MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
    host: '10.5.104.21', // MySQL zerbitzariaren helbidea
    user: 'iker', // MySQL erabiltzailea
    password: '', // MySQL pasahitza
    database: 'calendar', // Datu-basearen izena
    port: '3307' , // Portua 
});


// const db = mysql.createConnection({
//     host: 'localhost', // MySQL zerbitzariaren helbidea
//     user: 'root', // MySQL erabiltzailea
//     password: 'root', // MySQL pasahitza
//     database: 'calendar', // Datu-basearen izena
//     port: '3306' , // Portua 
// });


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

app.get('/horarios', async (req, res) => {
  try {
      const profeId = req.query.profe_id;
      const query = `
          SELECT h.dia, h.hora, h.profe_id, m.nombre AS modulo
          FROM horarios h
          JOIN modulos m ON h.modulo_id = m.id
          WHERE h.profe_id = ?
      `;
      db.query(query, [profeId], (err, results) => {
        if(err){
          console.error('Error al obtener los horarios:', err);
          return res.status(500).send('Error interno del servidor');
        }
      res.send(results)
      });
  } catch (error) {
      console.error('Error al obtener los horarios:', error);
      res.status(500).json({ error: 'Error al obtener los horarios' });
  }
});

app.get('/horarios-estudiante', async (req, res) => {
  try {
      const estudianteId = req.query.estudiante_id; // Obtenemos el ID del estudiante desde los parámetros de consulta
      const query = `
        SELECT 
              h.dia AS Dia,
              h.hora AS Hora,
              m.nombre AS Modulo
          FROM 
              horarios h
          JOIN 
              modulos m ON m.id = h.modulo_id
          WHERE 
              m.nombre NOT IN ('Tutoria', 'Guardia') 
              AND h.modulo_id IN (
                  SELECT 
                      m.id 
                  FROM 
                      modulos m
                  WHERE 
                      m.ciclo_id = (
                          SELECT 
                              ciclo_id 
                          FROM 
                              matriculaciones mat
                          WHERE 
                              alum_id = 3
                      )
                      AND m.curso = (
                          SELECT 
                              curso 
                          FROM 
                              matriculaciones mat
                          WHERE 
                              alum_id = ?
                      )
              )
          GROUP BY 
              h.dia, h.hora, m.nombre
                  ORDER BY 
                      CASE 
                          WHEN h.dia = 'L/A' THEN 1
                          WHEN h.dia = 'M/A' THEN 2
                          WHEN h.dia = 'X' THEN 3
                          WHEN h.dia = 'J/O' THEN 4
                          WHEN h.dia = 'V/O' THEN 5
                          ELSE 6
                      END,
                      h.hora;
      `;
      db.query(query, [estudianteId], (err, results) => {
        if (err) {
          console.error('Error al obtener los horarios del estudiante:', err);
          return res.status(500).send('Error interno del servidor');
        }
        res.send(results);
      });
  } catch (error) {
      console.error('Error al obtener los horarios del estudiante:', error);
      res.status(500).json({ error: 'Error al obtener los horarios del estudiante' });
  }
});

app.get('/reuniones/estudiante/:estudianteId', async (req, res) => {
    try {
        const estudianteId = req.params.estudianteId;
        const query = `
            SELECT 
                r.id_reunion, 
                r.titulo, 
                r.asunto, 
                r.aula, 
                r.fecha, 
                r.estado, 
                p.nombre AS profesor_nombre, 
                p.apellidos AS profesor_apellidos
            FROM 
                reuniones r 
            JOIN 
                users p ON r.profesor_id = p.id 
            WHERE 
                r.alumno_id = ?;
        `;
        db.query(query, [estudianteId], (err, results) => {
            if(err){
              console.error('Error al obtener las reuniones del estudiante:', err);
              return res.status(500).send('Error interno del servidor');
            }
            
          res.send(results)
          });
    } catch (error) {
        console.error('Error al obtener las reuniones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.get('/reuniones/profesor/:profesorId', async (req, res) => {
    try {
        const profesorId = req.params.profesorId;
        const query = `
            SELECT 
                r.id_reunion, 
                r.titulo, 
                r.asunto, 
                r.aula, 
                r.fecha, 
                r.estado, 
                p.nombre AS alumno_nombre, 
                p.apellidos AS alumno_apellidos
            FROM 
                reuniones r 
            JOIN 
                users p ON r.alumno_id = p.id 
            WHERE 
                r.profesor_id = ?;
        `;
        db.query(query, [profesorId], (err, results) => {
            if(err){
              console.error('Error al obtener las reuniones del estudiante:', err);
              return res.status(500).send('Error interno del servidor');
            }
           
          res.send(results)
          });
    } catch (error) {
        console.error('Error al obtener las reuniones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.get('/reuniones/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const query = `
          SELECT * FROM reuniones WHERE id_reunion = ?;
      `;
      db.query(query, [id], (err, results) => {
          if(err){
            console.error('Error al obtener las reuniones del estudiante:', err);
            return res.status(500).send('Error interno del servidor');
          }
        console.log(results);
        res.send(results)
        });
    } catch (error) {
        console.error('Error al obtener las reuniones:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

app.post('/users/create', (req, res) => {
    const newUser = req.body;
  
    const query = `
      INSERT INTO users 
      (id,email, username, password, nombre, apellidos, dni, direccion, telefono1, telefono2, tipo_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      newUser.id,
      newUser.email,
      newUser.username,
      newUser.password,
      newUser.nombre,
      newUser.apellidos,
      newUser.dni,
      newUser.direccion,
      newUser.telefono1,
      newUser.telefono2,
      newUser.tipo_id,
    ];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al crear el usuario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Usuario creado correctamente', id: results.insertId });
    });
  });

app.get('/users/:id', (req, res) => {
    const userId = req.params.id; // Obtén el ID del usuario desde los parámetros de la URL
    const query = 'SELECT * FROM users WHERE id = ?'; // Consulta SQL para obtener un usuario por su ID

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.send(results[0]); // Devuelve el primer resultado (el usuario encontrado)
    });
});


app.put('/users/update/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
  
    const query = `
      UPDATE users 
      SET 
        email = ?, 
        username = ?, 
        password = ?, 
        nombre = ?, 
        apellidos = ?, 
        dni = ?, 
        direccion = ?, 
        telefono1 = ?, 
        telefono2 = ?, 
        tipo_id = ? 
      WHERE id = ?
    `;
  
    const values = [
      updatedUser.email,
      updatedUser.username,
      updatedUser.password,
      updatedUser.nombre,
      updatedUser.apellidos,
      updatedUser.dni,
      updatedUser.direccion,
      updatedUser.telefono1,
      updatedUser.telefono2,
      updatedUser.tipo_id,
      userId,
    ];
  
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error al actualizar el usuario:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  });


app.delete('/users/delete/:id', (req, res) => {
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

