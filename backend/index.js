// backend/index.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
// Inicializamos la aplicación
const app = express();
const PORT = process.env.PORT || 4000; // React suele usar el 3000, así que usaremos el 4000 para el backend

// Middlewares (Intermediarios)
app.use(cors()); // Permite conexiones desde otros dominios (tu frontend)
app.use(express.json()); // Permite leer JSON en las peticiones (req.body)

// Ruta de prueba (Health Check)
app.get('/', (req, res) => {
  res.send('API funcionando en Vercel 🚀');
});

app.use('/api/products', productRoutes);

// Ruta API de prueba
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: "Hola desde el servidor Node/Express" });
});

// Arrancar el servidor
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Servidor corriendo localmente en http://localhost:${PORT}`);
    });
}

// ESTO ES LO QUE VERCEL NECESITA:
module.exports = app;