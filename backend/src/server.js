import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import dotenv from 'dotenv';
import router from './routes/api.js';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = express();

server.use(express.static(path.join(__dirname,'../public')));
server.use(express.urlencoded({extended:true}));

server.get('/ping',(req,res)=>res.json({pong:true}));

server.use(router);

server.listen(process.env.PORT, ()=>console.log("Servidor rodando!"));