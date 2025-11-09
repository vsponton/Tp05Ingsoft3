// create_db.js 🌿
const sqlite3 = require('sqlite3').verbose();

// Crear o abrir la base de datos
const db = new sqlite3.Database('planthub.db', (err) => {
  if (err) {
    console.error('❌ Error al crear la base de datos:', err.message);
  } else {
    console.log('🌱 Base de datos planthub.db creada correctamente.');
  }
});

// Crear tabla Plants y cargar datos iniciales
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      size TEXT,
      light TEXT,
      water TEXT,
      description TEXT
    )
  `, (err) => {
    if (err) {
      console.error('❌ Error al crear la tabla:', err.message);
    } else {
      console.log('🪴 Tabla "plants" creada correctamente.');
    }
  });

  const insert = `
    INSERT INTO plants (name, type, size, light, water, description)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const sampleData = [
    ['Ficus Lyrata', 'Interior', 'Grande', 'Media sombra', 'Cada 5 días', 'Planta de hojas grandes y brillantes.'],
    ['Aloe Vera', 'Suculenta', 'Mediana', 'Pleno sol', 'Cada 10 días', 'Fácil de cuidar, purifica el aire.'],
    ['Monstera Deliciosa', 'Interior', 'Grande', 'Luz indirecta', 'Cada 7 días', 'Conocida como “Costilla de Adán”.']
  ];

  sampleData.forEach((plant) => {
    db.run(insert, plant, (err) => {
      if (err) console.error('⚠️ Error insertando planta:', err.message);
    });
  });
});

db.close(() => {
  console.log('✅ Base de datos cerrada correctamente.');
});
