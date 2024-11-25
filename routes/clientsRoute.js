import express from 'express';
import { getAllClientsController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllClientsController); // Rota para obter os clientes
export default router;
