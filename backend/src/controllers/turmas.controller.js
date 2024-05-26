import pool from '../db/mysql.js';

export const addTurma = async (req, res) => {
    try{
        const nome = req.body.nome;
        //Verifica se o nome não está em branco
        if (!nome) {
            return res.status(400).json({message:'O nome da turma é obrigatório.'});
        }
        //cadastra a nova disciplina
        const query = "INSERT INTO turma(nome) VALUES (?)";
        const values = nome;
        await pool.query(query, values);
        res.status(201).json({message:'Turma cadastrada com sucesso!'});
    }catch (error) {
        // Tratar erros
        console.error(error);
        res.status(500).json({ message: 'Erro ao cadastrar a turma!' });
   }
}

export const listarTurmas = async (req, res) => {
    try {
        const query = "SELECT * FROM turma";
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar as turmas!' });
    }
};

export const editarTurma = async (req, res) => {
    try {
        const id = req.params.id;
        const nome = req.body.nome;

        // Verifica se o ID e o nome não estão em branco
        if (!id || !nome) {
            return res.status(400).json({ message: 'O nome da turma é obrigatório.' });
        }

        // Atualiza a disciplina no banco de dados
        const query = "UPDATE turma SET nome = ? WHERE id_turma = ?";
        const values = [nome, id];
        await pool.query(query, values);

        res.status(200).json({ message: 'Turma atualizada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar a Turma!' });
    }
};