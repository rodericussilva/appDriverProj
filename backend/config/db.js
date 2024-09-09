
const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria um pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true, // Aguarda por conexões disponíveis
  connectionLimit: 10, // Número máximo de conexões simultâneas
  queueLimit: 0 // Número máximo de conexões na fila
});

module.exports = pool;