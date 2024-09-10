// routes/deliveriesRoutes.js
const express = require('express');
const router = express.Router();
const deliveriesController = require('../controllers/deliveriesController');
const uploadController = require('../controllers/uploadController'); // Certifique-se de importar o uploadController

// Rota para upload das fotos das entregas
router.post('/upload/:deliveryId/:userId', uploadController.upload.single('photo'), deliveriesController.uploadDeliveryPhoto);

module.exports = router;