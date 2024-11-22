const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendEmailWithAttachment } = require('../services/emailService');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const uploadPath = path.join(__dirname, '..', 'uploads', userId);


    if (!fs.existsSync(uploadPath)) {
      try {
        fs.mkdirSync(uploadPath, { recursive: true });
      } catch (error) {
        console.error(`Erro ao criar o diretório de upload: ${error.message}`);
        return cb(new Error('Falha ao criar diretório de upload'), false);
      }
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const userId = req.params.userId;
  const { userName } = req.body;

  if (req.file) {
    try {
      console.log(`Arquivo recebido do usuário ${userId}: ${req.file.filename}`);

      const filePath = req.file.path;

      if (!filePath || typeof filePath !== 'string') {
        throw new Error('Caminho do arquivo não é válido');
      }

      await sendEmailWithAttachment({
        path: filePath,
        originalname: req.file.originalname, userName
      });

      res.json({ message: 'Foto enviada e armazenada com sucesso!', file: req.file.filename });
    } catch (error) {
      console.error('Erro ao processar o arquivo:', error);
      res.status(500).json({ message: 'Erro ao processar o arquivo' });
    }
  } else {
    res.status(400).json({ message: 'Nenhum arquivo recebido' });
  }
};

module.exports = { upload, uploadFile };
