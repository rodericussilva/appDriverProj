const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
    }
  
    next();
  };
  
  module.exports = {
    validateLogin
}; 