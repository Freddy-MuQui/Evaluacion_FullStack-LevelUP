// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
// Importamos el controlador que ya tienes creado
const productController = require('../controllers/productController');

// Cuando alguien entre a la raíz de ESTA ruta (será /api/products), ejecuta getProducts
router.get('/', productController.getProducts);

// Cuando alguien pida un ID específico
router.get('/:id', productController.getProductById);

module.exports = router;