// controllers/uploadController.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendEmailWithAttachment } = require('../services/emailService');

// Configuração do multer para armazenar arquivos no servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.params.userId;
    const uploadPath = path.join(__dirname, '..', 'uploads', userId); // Define o caminho de upload

    // Verifica se o diretório existe, caso contrário, cria
    if (!fs.existsSync(uploadPath)) {
      try {
        fs.mkdirSync(uploadPath, { recursive: true });
      } catch (error) {
        console.error(`Erro ao criar o diretório de upload: ${error.message}`);
        return cb(new Error('Falha ao criar diretório de upload'), false);
      }
    }

    cb(null, uploadPath); // Define o caminho de destino para o multer
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo como o original com a extensão correta
    cb(null, file.originalname);
  }
});

// Configuração do multer
const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const userId = req.params.userId;
  const { userName } = req.body;

  if (req.file) {
    try {
      console.log(`Arquivo recebido do usuário ${userId}: ${req.file.filename}`);

      // Passa o caminho completo do arquivo
      const filePath = req.file.path;

      // Verifica se o caminho do arquivo é válido
      if (!filePath || typeof filePath !== 'string') {
        throw new Error('Caminho do arquivo não é válido');
      }

      // Envia o e-mail com o arquivo anexado exatamente como foi salvo
      await sendEmailWithAttachment({
        path: filePath, // Caminho completo do arquivo
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
