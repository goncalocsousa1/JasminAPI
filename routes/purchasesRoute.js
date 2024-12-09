import express from 'express';
import { getAllOrdersPurchasesController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllOrdersPurchasesController); // Rota para obter as purchases

export default router;