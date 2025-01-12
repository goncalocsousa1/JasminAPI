import express from 'express';
import { getAllOrdersController, getOrderByParamsController, createOrderController, deleteOrderByParamsController, getOrderByIDController} from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', getAllOrdersController); // Rota para obter as orders
router.get('/:id', getOrderByIDController); // Rota para obter a encomenda específica
router.get('/:companyKey/:documentType/:year/:month', getOrderByParamsController); // Rota para obter a encomenda específica
router.post('/', createOrderController); //rota para criar uma encomenda
router.delete('/:companyKey/:documentType/:year/:month', deleteOrderByParamsController);  //rota para eliminar uma encomenda
export default router;
