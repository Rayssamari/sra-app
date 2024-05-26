import bcrypt from 'bcrypt';
import pool from '../db/mysql.js';

export const addUsuario = async (req, res) => {
  const { nome, email, senha, tipo, avatar, disciplinas_id } = req.body;

  try {
    // Verificar se o email já existe
    const [rows] = await pool.query('SELECT email FROM usuarios WHERE email = ?', email);

    if (rows.length > 0) {
      // Se o email já existe, retornar um erro
      return res.status(400).json({ message: 'Email já cadastrado!' });
    }

    // Selecionar o valor de avatar se ele não for undefined ou null
    const avatarValue = avatar !== undefined && avatar !== null ? avatar : null;

    //criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Adicionar o novo usuário
    const query = 'INSERT INTO usuarios (nome, email, senha, tipo, avatar) VALUES (?, ?, ?, ?, ?)';
    const values = [nome, email, senhaCriptografada, tipo, avatarValue];
    await pool.query(query, values);

    // Obter o id do usuário inserido
    const usuarioId = await getUsuarioId(email);

    // Se o tipo do usuário for professor, adicionar as disciplinas
    const newtipo = parseInt(tipo);
    if (newtipo === 2) {
      const professorId = await getProfessorId(usuarioId);
      for (const disciplinaId of disciplinas_id) {
        const query = 'INSERT INTO professores_disciplinas (id_professor, id_disciplina) VALUES (?, ?)';
        const values = [professorId, disciplinaId];
        await pool.query(query, values);
      }
    }

    // Retornar uma mensagem de sucesso
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    // Tratar erros
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário!' });
  }
};

export const getUsers = async (req, res) => {
    try{
      const [usuarios] = await pool.query("SELECT id_usuario, nome FROM usuarios");
      if (usuarios.length > 0) {
        return res.status(200).json({usuarios});
      } else {
        return res.status(400).json({ message: 'Não há usuários cadastrados!' });
      }
    }catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao consultar os usuários!' });
    }
}

// Função para obter o id do usuário a partir do email
const getUsuarioId = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario FROM usuarios WHERE email = ?', email);
  return rows[0].id_usuario;
};

// Função para obter o id do professor a partir do id do usuário
const getProfessorId = async (usuarioId) => {
  const [rows] = await pool.query('SELECT id_usuario FROM professor WHERE id_usuario = ?', usuarioId);
  return rows[0].id_usuario;
};

