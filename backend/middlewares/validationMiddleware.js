// backend/middleware/validationMiddleware.js
const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    // Verifica se username e password são fornecidos
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }
  
    // Se os dados forem válidos, continue para o próximo middleware ou rota
    next();
  };
  
  module.exports = {
    validateLogin
}; 