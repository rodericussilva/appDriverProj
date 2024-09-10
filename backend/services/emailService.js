// services/emailService.js
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Configuração do transportador de e-mail para Outlook
const transporter = nodemailer.createTransport({
    service: 'outlook', // Verifique se está correto; pode ser necessário ajustar para 'hotmail'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmailWithAttachment = async ({ path: filePath, originalname }) => {
  if (!filePath || !originalname) {
    throw new Error('O caminho do arquivo e o nome original são obrigatórios');
  }

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error('O arquivo não existe no caminho especificado');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
        to: 'analise@tsdistribuidora.com.br', // Altere conforme necessário
        subject: 'Envio de arquivo', // Altere conforme necessário
        text: 'Segue o arquivo enviado pelo usuário.', // Corpo do e-mail,
    attachments: [
      {
        filename: originalname,
        path: filePath // Caminho completo do arquivo
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};

module.exports = { sendEmailWithAttachment };