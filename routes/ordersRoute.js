import express from 'express';
import { getAllOrdersController, getOrderByParamsController, createOrderController } from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', getAllOrdersController); // Rota para obter as orders
router.get('/:companyKey/:documentType/:year/:month', getOrderByParamsController); // Rota para obter a encomenda específica
router.post('/', createOrderController); //rota para criar uma encomenda
export default router;
