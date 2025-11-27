const { getConnection, sql } = require('../config/db');
const bcrypt = require('bcryptjs');

// ============ PRODUCTOS ============

// Obtener todos los productos
const getAllProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Productos');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear producto
const createProduct = async (req, res) => {
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('descripcion', sql.VarChar, descripcion)
      .input('imagen', sql.VarChar, imagen)
      .query(`INSERT INTO Productos (nombre, precio, descripcion, imagen) 
              VALUES (@nombre, @precio, @descripcion, @imagen)`);
    res.json({ message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, descripcion, imagen } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('precio', sql.Decimal(10, 2), precio)
      .input('descripcion', sql.VarChar, descripcion)
      .input('imagen', sql.VarChar, imagen)
      .query(`UPDATE Productos 
              SET nombre=@nombre, precio=@precio, descripcion=@descripcion, imagen=@imagen 
              WHERE id=@id`);
    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Productos WHERE id=@id');
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============ USUARIOS ============

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT id, nombre, email, rol FROM Usuarios');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('email', sql.VarChar, email)
      .input('rol', sql.VarChar, rol)
      .query(`UPDATE Usuarios 
              SET nombre=@nombre, email=@email, rol=@rol 
              WHERE id=@id`);
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Usuarios WHERE id=@id');
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ============ AUTENTICACIÓN ADMIN ============

// Login admin
const loginAdmin = async (req, res) => {
  const { usuario, contraseña } = req.body;
  try {
    // Credenciales hardcodeadas (luego mejoramos con BD)
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || '1234';

    if (usuario === ADMIN_USER && contraseña === ADMIN_PASS) {
      // En producción usa JWT, por ahora devolvemos un token simple
      const token = Buffer.from(`${usuario}:${contraseña}`).toString('base64');
      res.json({ 
        token, 
        message: 'Login exitoso',
        usuario: usuario,
        timestamp: new Date()
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout admin
const logoutAdmin = async (req, res) => {
  try {
    res.json({ message: 'Logout exitoso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  updateUser,
  deleteUser,
  loginAdmin,
  logoutAdmin
};
