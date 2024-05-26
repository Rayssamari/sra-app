import bcrypt from 'bcrypt';
import pool from '../db/mysql.js';

export const login = async (req, res) => {
    const { email, senha } = req.body;
  
    try {
      // Verificar se o email existe
      const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', email);
  
      if (rows.length === 0) {
        // Se o email não existe, retornar um erro
        return res.status(401).json({ message: 'Email não cadastrado no sistema!' });
      }
  
      const user = rows[0];
      const senhaCriptografada = user.senha;
  
      // Verificar se a senha informada é igual à senha criptografada no banco
      const isValid = await bcrypt.compare(senha, senhaCriptografada);
  
      if (!isValid) {
        // Se a senha não é válida, retornar um erro
        return res.status(401).json({ message: 'Email ou senha incorretos!' });
      }
  
      // Se a senha é válida, retornar o tipo de usuário (1 = chefe da seção de ensino, 2 = professor)
      res.status(200).json({ message: 'Login realizado com sucesso!', tipo: user.tipo });
    } catch (error) {
      // Tratar erros
      console.error(error);
      res.status(500).json({ message: 'Erro ao realizar login!' });
    }
};

export const logout = async (req, res) => {
    // Limpar a sessão do usuário
    req.session.destroy();
  
    // Retornar uma mensagem de sucesso
    res.status(200).json({ message: 'Logout realizado com sucesso!' });
};