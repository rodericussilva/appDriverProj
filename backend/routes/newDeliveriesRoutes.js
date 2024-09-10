// routes/newDeliveriesRoutes.js
const express = require('express');
const router = express.Router();
const newDeliveriesController = require('../controllers/newDeliveriesController');
const uploadController = require('../controllers/uploadController');

// Rotas para entregas
router.post('/', newDeliveriesController.addNewDelivery);
router.get('/:userId', newDeliveriesController.getDeliveries);
router.put('/:id/nf', newDeliveriesController.updateDeliveryNF);
router.put('/:id/status', newDeliveriesController.updateDeliveryStatus);

// Rotas para upload de arquivos
router.post('/upload/:deliveryId/:userId', uploadController.upload.single('photo'), uploadController.uploadFile);

module.exports = router;