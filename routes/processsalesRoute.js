import express from 'express';
import { postProcessSalesController} from '../controllers/processSalesController.js';

const router = express.Router();

router.post('/', postProcessSalesController); // Rota para gerar faturas para o cliente
export default router;