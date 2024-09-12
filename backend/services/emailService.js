
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Configuração do transportador de e-mail
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmailWithAttachment = async ({ path: filePath, originalname, userName }) => {
  if (!filePath || !originalname) {
    throw new Error('O caminho do arquivo e o nome original são obrigatórios');
  }

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    throw new Error('O arquivo não existe no caminho especificado');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
        to: 'analise@tsdistribuidora.com.br',
        bcc: 'analise@tsdistribuidora.com.br',
        subject: 'Notificação de entrega',
        text: `Olá, \n \nO motorista ${userName} acabou de efetuar uma entega. \n \nSegue arquivo em anexo para verificação. \n \nAtt., \n \n------ \n \n \nEste email é enviado de forma automática, favor não responder!`,
    attachments: [
      {
        filename: originalname,
        path: filePath
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