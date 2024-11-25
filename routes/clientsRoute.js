import express from 'express';
import { getAllClientsController , getClientByKeyController, createClientController} from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllClientsController); // Rota para obter os clientes
router.get('/:key', getClientByKeyController); //rota para ir buscar o cliente específico
router.post('/', createClientController); //rota para criar um client
export default router;
