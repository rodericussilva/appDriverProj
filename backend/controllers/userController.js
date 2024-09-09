const pool = require('../config/db');

// Função de login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Usuário e senha são obrigatórios.' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  try {
    const [results] = await pool.query(query, [username, password]);

    if (results.length > 0) {
      // Supondo que `userId`, `userName`, e `userRole` são retornados
      const user = results[0];
      res.json({ 
        success: true, 
        userId: user.id,
        userName: user.name, 
        userRole: user.role 
      });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha inválidos.' });
    }
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
  }
};

// Função para obter um usuário por ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ message: 'ID do usuário é obrigatório.' });
  }

  const query = 'SELECT * FROM users WHERE id = ?';

  try {
    const [results] = await pool.query(query, [userId]);

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Usuário não encontrado.' });
    }
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};