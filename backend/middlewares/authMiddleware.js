// backend/middleware/authMiddleware.js
const authenticateUser = (req, res, next) => {
    const { user } = req; // Supondo que o usuário autenticado seja adicionado à solicitação
  
    if (!user) {
      return res.status(401).json({ message: 'Não autorizado. Faça login.' });
    }
  
    // Se o usuário estiver autenticado, continue para o próximo middleware ou rota
    next();
  };
  
  module.exports = {
    authenticateUser
};  