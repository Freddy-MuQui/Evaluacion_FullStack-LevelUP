const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// ============ AUTENTICACIÓN ============
router.post('/login', adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);

// ============ PRODUCTOS ============
router.get('/productos', adminController.getAllProducts);
router.post('/productos', adminController.createProduct);
router.put('/productos/:id', adminController.updateProduct);
router.delete('/productos/:id', adminController.deleteProduct);

// ============ USUARIOS ============
router.get('/usuarios', adminController.getAllUsers);
router.put('/usuarios/:id', adminController.updateUser);
router.delete('/usuarios/:id', adminController.deleteUser);

module.exports = router;
