const express = require("express");
const cors = require("cors");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

// Base de datos
const db = new sqlite3.Database(path.join(__dirname, "planthub.db"));

// Crear tabla de plantas
db.run(`
CREATE TABLE IF NOT EXISTS plants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  type TEXT,
  difficulty TEXT,
  light TEXT,
  watering TEXT,
  description TEXT,
  rating INTEGER
)
`);

// Datos iniciales
const defaultPlants = [
  ["Monstera Deliciosa", "Interior", "Fácil", "Media sombra", "1 vez por semana", "Planta tropical de hojas grandes y brillantes.", 5],
  ["Lavanda", "Exterior", "Media", "Pleno sol", "Cada 3 días", "Aromática, ideal para el jardín.", 4],
  ["Cactus", "Exterior", "Muy fácil", "Pleno sol", "1 vez por mes", "Resistente y decorativa.", 5]
];

db.all("SELECT COUNT(*) as count FROM plants", (err, rows) => {
  if (rows[0].count === 0) {
    const stmt = db.prepare("INSERT INTO plants (name, type, difficulty, light, watering, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
    defaultPlants.forEach(p => stmt.run(p));
    stmt.finalize();
  }
});

// Endpoints
app.get("/plants", (req, res) => {
  db.all("SELECT * FROM plants", (err, rows) => res.json(rows));
});

app.post("/plants", (req, res) => {
  const { name, type, difficulty, light, watering, description, rating } = req.body;
  db.run("INSERT INTO plants (name, type, difficulty, light, watering, description, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, type, difficulty, light, watering, description, rating],
    err => res.json({ message: "Planta agregada con éxito" })
  );
});

app.get("/stats", (req, res) => {
  db.all("SELECT COUNT(*) as total, AVG(rating) as avg FROM plants", (err, rows) => {
    db.get("SELECT type, COUNT(*) as count FROM plants GROUP BY type ORDER BY count DESC LIMIT 1", (err, most) => {
      res.json({
        total: rows[0].total,
        avg: rows[0].avg.toFixed(2),
        popularType: most.type
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🌿 PlantHub corriendo en http://localhost:${PORT}`);
});
