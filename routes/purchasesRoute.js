import express from 'express';
import { getAllOrdersPurchasesController, getAllOrdersPurchasesIDController, createOrderPurchaseController} from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllOrdersPurchasesController); // Rota para obter as purchases
router.get('/:ID', getAllOrdersPurchasesIDController); // Rota para obter a purchases específica
router.post('/', createOrderPurchaseController); //rota para criar uma encomenda
export default router;