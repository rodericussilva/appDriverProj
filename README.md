# Sistema de Gestão de Entregas

Este projeto é um sistema web para a gestão de entregas, desenvolvido para dispositivos móveis, que permite o planejamento, registro e acompanhamento das entregas realizadas pelos motoristas. 

## 📋 **Funcionalidades**

### **Frontend**
- Login seguro para motoristas.
- Inserção de números de notas fiscais das entregas.
- Visualização e gerenciamento de entregas pendentes.
- Upload de fotos para comprovação de entregas.
- Integração com Google Maps e Waze para navegação.
- Interface amigável e responsiva, focada no uso em dispositivos móveis.

### **Backend**
- APIs para gerenciar usuários, entregas e uploads.
- Envio de e-mails automáticos com arquivos anexados.
- Banco de dados para armazenar entregas e status.
- Middleware para autenticação e validação.
- Gerenciamento seguro de arquivos de upload.

---

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- HTML5, CSS3, JavaScript
- Frameworks e bibliotecas: Font Awesome

### **Backend**
- Node.js com Express.js
- MySQL2 para banco de dados
- Multer para upload de arquivos
- Nodemailer para envio de e-mails

---

## 🚀 **Configuração do Projeto**

### **Requisitos**
- Node.js v16+ instalado.
- MySQL configurado com as credenciais no arquivo `.env`.

### **Instalação**
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   
2. Acesse o diretório do projeto:
   ```bash
   cd nome-do-repositorio

3. Instale as dependências do backend:
   ```bash
   npm install

4. Configure as variáveis de ambiente no arquivo .env:
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=nome_do_banco
   EMAIL_USER=seu_email
   EMAIL_PASS=sua_senha_email

5. Inicie o servidor:
   ```bash
   npm start

6. O servidor estará disponível em:
   ```arduino
   http://localhost:3020

## 🗂️ Estrutura do Projeto
### Backend
```arduino
  backend/
├── config/
│   └── db.js           # Configuração do banco de dados
├── controllers/
│   ├── newDeliveriesController.js
│   ├── uploadController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── uploadMiddleware.js
│   └── validationMiddleware.js
├── models/
│   └── newDeliveryModel.js
├── routes/
│   ├── deliveriesRoutes.js
│   ├── newDeliveriesRoutes.js
│   └── userRoutes.js
├── services/
│   └── emailService.js
└── server.js           # Inicialização do servidor
```

### Frontend
```arduino
frontend/
├── assets/
│   ├── icons/
│   ├── images/
├── css/
│   ├── styleGlobal.css
│   ├── styleInputOrder.css
│   └── styleLogin.css
├── js/
│   ├── inputOrder.js
│   ├── login.js
│   ├── navbar.js
│   └── user.js
├── views/
│   ├── inputOrder.html
│   ├── login.html
│   └── navbar.html
```

## 🛡️ Segurança
- O projeto utiliza tokens de autenticação para proteger as rotas da API.
- Informações sensíveis como credenciais de banco de dados são armazenadas em variáveis de ambiente.

## 📬 Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato comigo em rodericus@alu.ufc.br

