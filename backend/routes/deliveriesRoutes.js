const express = require('express');
const router = express.Router();
const deliveriesController = require('../controllers/deliveriesController');
const uploadController = require('../controllers/uploadController');

router.post('/upload/:deliveryId/:userId', uploadController.upload.single('photo'), deliveriesController.uploadDeliveryPhoto);

module.exports = router;