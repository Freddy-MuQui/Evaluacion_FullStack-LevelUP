const express = require('express');
const router = express.Router();

// Simulación simple de base de datos en memoria
let users = [];

// POST /api/auth/register - Registrar usuario
router.post('/register', (req, res) => {
  try {
    const { email, password, full_name, role } = req.body;

    // Validaciones básicas
    if (!email || !password || !full_name) {
      return res.status(400).json({
        error: 'Faltan campos requeridos',
        required: ['email', 'password', 'full_name']
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        error: 'El usuario ya existe'
      });
    }

    // Crear usuario
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      password,
      full_name,
      role: role || 'cliente',
      created_at: new Date().toISOString()
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;
    
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al registrar usuario',
      details: error.message
    });
  }
});

// POST /api/auth/login - Iniciar sesión
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y contraseña son requeridos'
      });
    }

    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({
        error: 'Credenciales inválidas'
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json({
      message: 'Login exitoso',
      token: `fake_token_${user.id}_${Date.now()}`,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al iniciar sesión',
      details: error.message
    });
  }
});

// GET /api/auth/users - Listar todos los usuarios
router.get('/users', (req, res) => {
  try {
    const usersWithoutPasswords = users.map(u => {
      const { password, ...userWithoutPassword } = u;
      return userWithoutPassword;
    });

    res.status(200).json({
      count: users.length,
      users: usersWithoutPasswords
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener usuarios',
      details: error.message
    });
  }
});

module.exports = router;
