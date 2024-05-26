import pool from '../db/mysql.js';

export const addDisciplina = async (req, res) => {
    try{
        const nome = req.body.nome;
        //Verifica se o nome não está em branco
        if (!nome) {
            return res.status(400).json({message:'O nome da disciplina é obrigatório.'});
        }
        //cadastra a nova disciplina
        const query = "INSERT INTO disciplina(nome) VALUES (?)";
        const values = nome;
        await pool.query(query, values);
        res.status(201).json({message:'Disciplina cadastrada com sucesso!'});
    }catch (error) {
        // Tratar erros
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar a disciplina!' });
   }
}

export const listarDisciplinas = async (req, res) => {
    try {
        const query = "SELECT * FROM disciplina";
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar as disciplinas!' });
    }
};

export const editarDisciplina = async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;

        // Verifica se o ID e o nome não estão em branco
        if (!id || !nome) {
            return res.status(400).json({ message: 'O nome da disciplina é obrigatório.' });
        }

        // Atualiza a disciplina no banco de dados
        const query = "UPDATE disciplina SET nome = ? WHERE id_disciplina = ?";
        const values = [nome, id];
        await pool.query(query, values);

        res.status(200).json({ message: 'Disciplina atualizada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a disciplina!' });
    }
};