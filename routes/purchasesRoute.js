import express from 'express';
import { getAllOrdersPurchasesController, getAllOrdersPurchasesIDController, createOrderPurchaseController, deletePurchaseByParamsController} from '../controllers/purchasesController.js';

const router = express.Router();

router.get('/', getAllOrdersPurchasesController); // Rota para obter as purchases
router.get('/:ID', getAllOrdersPurchasesIDController); // Rota para obter a purchases específica
router.post('/', createOrderPurchaseController); //rota para criar uma encomenda
router.delete('/:companyKey/:documentType/:year/:month', deletePurchaseByParamsController);  //rota para eliminar uma encomenda
export default router;