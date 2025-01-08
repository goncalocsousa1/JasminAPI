import express from 'express';
import { getAllSaleItemsController} from '../controllers/salesController.js';

const router = express.Router();

router.get('/', getAllSaleItemsController); // Rota para obter as purchases

export default router;