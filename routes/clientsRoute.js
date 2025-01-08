import express from 'express';
import { getAllClientsController , getClientByKeyController, createClientController} from '../controllers/clientsController.js';

const router = express.Router();

router.get('/', getAllClientsController); // Rota para obter os clientes
router.get('/:key', getClientByKeyController); //rota para ir buscar o cliente específico
router.post('/', createClientController); //rota para criar um cliente
export default router;
