const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db');

// Configuração do multer para armazenar arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const uploadPath = path.join(__dirname, '..', 'uploads', userId);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const deliveryId = req.params.deliveryId;
  const userId = req.params.userId;

  if (req.file) {
    try {
      console.log(`Arquivo recebido da entrega do usuário ${userId}: ${req.file.filename}`);

      // Atualiza o status da entrega no banco de dados
      const updateQuery = `
        UPDATE romaneios
        SET status = 'realizada'
        WHERE id = ?
      `;
      await pool.query(updateQuery, [deliveryId]);

      // Insere o registro na tabela deliveries_history
      const insertQuery = `
        INSERT INTO deliveries_history (delivery_id, user_id, photo_path, planned_at)
        VALUES (?, ?, ?, NOW())
      `;
      await pool.query(insertQuery, [deliveryId, userId, req.file.filename]);

      res.json({ message: 'Foto enviada com sucesso!', file: req.file.filename });
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      res.status(500).json({ message: 'Erro ao processar o arquivo' });
    }
  } else {
    res.status(400).json({ message: 'Nenhum arquivo recebido' });
  }
};

module.exports = { upload, uploadFile };