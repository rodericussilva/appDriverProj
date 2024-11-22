const NewDeliveryModel = require('../models/newDeliveryModel');
const fs = require('fs');
const path = require('path');

exports.addNewDelivery = async (req, res) => {
  const { nfNumber, userId } = req.body;
  try {
    const newDelivery = await NewDeliveryModel.addNewDelivery(nfNumber, userId);
    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar nova entrega.' });
  }
};

exports.getDeliveries = async (req, res) => {
  const { userId } = req.params;
  try {
    const deliveries = await NewDeliveryModel.getDeliveriesByUser(userId);
    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Erro ao buscar entregas:', error);
    res.status(500).json({ message: 'Erro ao buscar entregas.' });
  }
};

exports.updateDeliveryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await NewDeliveryModel.updateDeliveryStatus(id, status);
    res.status(200).json({ message: 'Status da entrega atualizado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar status da entrega.' });
  }
};

exports.updateDeliveryNF = async (req, res) => {
  const { id } = req.params;
  const { nfNumber } = req.body;

  try {
    await NewDeliveryModel.updateDeliveryNF(id, nfNumber);
    res.status(200).json({ message: 'Número da nota fiscal atualizado.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o número da nota fiscal.' });
  }
};

exports.uploadPhoto = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const userDir = path.join(__dirname, '../uploads', String(userId));
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    if (req.file) {
      res.status(200).json({ message: 'Foto enviada com sucesso.' });
    } else {
      res.status(400).json({ message: 'Erro ao enviar a foto.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar upload de foto.' });
  }
};