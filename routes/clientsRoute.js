import express from 'express';
import { getAllClientsController , getClientByKeyController} from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllClientsController); // Rota para obter os clientes
router.get('/:key', getClientByKeyController); //rota para ir buscar o cliente específico
export default router;
