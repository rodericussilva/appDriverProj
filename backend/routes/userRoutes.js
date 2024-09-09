const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para login
router.post('/login', userController.login);

// Rota para obter um usuário por ID
router.get('/:id', userController.getUserById);

module.exports = router;