// backend/routes/newDeliveriesRoutes.js
const express = require('express');
const router = express.Router();
const newDeliveriesController = require('../controllers/newDeliveriesController');
const upload = require('../middlewares/uploadMiddleware'); // Importação correta do middleware de upload

router.post('/', newDeliveriesController.addNewDelivery);
router.get('/:userId', newDeliveriesController.getDeliveries);
router.put('/:id/nf', newDeliveriesController.updateDeliveryNF);
router.put('/:id/status', newDeliveriesController.updateDeliveryStatus);
router.post('/upload/:deliveryId/:userId', upload.single('photo'), newDeliveriesController.uploadPhoto);

module.exports = router;