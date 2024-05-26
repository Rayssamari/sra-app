import { Router } from "express";
import * as usuarioController from "../controllers/usuario.controller.js";
import * as authController from "../controllers/auth.controller.js";
import * as disciplinaController from "../controllers/disciplinas.controller.js";
import * as turmaController from "../controllers/turmas.controller.js";

const router = Router();


//Rotas para disciplina
router.post('/disciplina', disciplinaController.addDisciplina);
router.get('/disciplina', disciplinaController.listarDisciplinas);
router.put('/disciplina/:id', disciplinaController.editarDisciplina);

//Rotas para turma
router.post('/turma', turmaController.addTurma);
router.get('/turma', turmaController.listarTurmas);
router.put('/turma/:id', turmaController.editarTurma);

// Rotas para  usuario
router.post('/usuario', usuarioController.addUsuario);
router.get('/usuarios', usuarioController.getUsers);

//rotas de login
router.post('/login', authController.login);
router.post('/logout', authController.logout);



export default router;