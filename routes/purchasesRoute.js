import express from 'express';
import { getAllOrdersPurchasesController, getAllOrdersPurchasesIDController} from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllOrdersPurchasesController); // Rota para obter as purchases
router.get('/:ID', getAllOrdersPurchasesIDController); // Rota para obter a purchases específica
export default router;