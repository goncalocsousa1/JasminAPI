import express from 'express';
import { faturaController, reciboController } from '../controllers/rpaController.js';

const router = express.Router();

router.post('/fatura', faturaController);
router.post('/recibo', reciboController);

export default router;
