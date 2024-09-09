
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware para configurar o multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.params.userId; // Pega o userId dos parâmetros da requisição
        const userDir = path.join(__dirname, '../uploads', userId); // Define o caminho da pasta do usuário

        // Cria a pasta se não existir
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }

        cb(null, userDir); // Define o diretório de upload
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
    }
});

const upload = multer({ storage }); // Corrigido para usar a configuração correta do storage

module.exports = upload;