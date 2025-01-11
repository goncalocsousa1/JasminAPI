import express from 'express';
import { getAllOrdersPurchasesController, getAllOrdersPurchasesIDController, createOrderPurchaseController, deletePurchaseByParamsController, getAllSuppliersController} from '../controllers/purchasesController.js';

const router = express.Router();

router.get('/suppliers', getAllSuppliersController); // Rota para obter os fornecedores
router.get('/', getAllOrdersPurchasesController); // Rota para obter as purchases
router.get('/:ID', getAllOrdersPurchasesIDController); // Rota para obter a purchases específica
router.post('/', createOrderPurchaseController); //rota para criar uma encomenda
router.delete('/:companyKey/:documentType/:year/:month', deletePurchaseByParamsController);  //rota para eliminar uma encomenda

export default router;