// backend/config/db.js
const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    connectionTimeout: 60000, 
    requestTimeout: 60000,
    options: {
        encrypt: true, // Obligatorio para Azure [cite: 595]
        trustServerCertificate: false // Cambiar a true si tienes problemas de SSL local
    }
};

async function getConnection() {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
        throw error;
    }
}

module.exports = { getConnection, sql };