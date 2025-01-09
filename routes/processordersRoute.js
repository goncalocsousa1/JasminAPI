import express from 'express';
import { postProcessOrdersController} from '../controllers/processePurchaseController.js';

const router = express.Router();

router.post('/', postProcessOrdersController); // Rota para gerar faturas
export default router;