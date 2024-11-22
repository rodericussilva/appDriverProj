const authenticateUser = (req, res, next) => {
    const { user } = req;
  
    if (!user) {
      return res.status(401).json({ message: 'Não autorizado. Faça login.' });
    }
  
    next();
  };
  
  module.exports = {
    authenticateUser
};  