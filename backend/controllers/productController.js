const { getConnection, sql } = require('../config/db');

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const pool = await getConnection();
        // Hacemos la consulta SQL
        const result = await pool.request().query('SELECT * FROM Productos');
        
        // Devolvemos las filas (recordset)
        res.json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener producto por ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id) // Usamos input para evitar inyección SQL
            .query('SELECT * FROM Productos WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getProducts, getProductById };