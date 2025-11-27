const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');  // ← NUEVA

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando en Vercel 🚀');
});

app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);  // ← NUEVA

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: "Hola desde el servidor Node/Express" });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo localmente en http://localhost:${PORT}`);
  });
}

module.exports = app;
