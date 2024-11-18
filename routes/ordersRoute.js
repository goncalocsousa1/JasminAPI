import express from 'express';
import { getAllOrdersController, getOrderByParamsController} from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllOrdersController); // Rota para obter as orders
router.get('/:companyKey/:documentType/:year/:month', getOrderByParamsController); // Rota para obter a encomenda específica
export default router;
