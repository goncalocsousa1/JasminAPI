import express from 'express';
import { faturaController } from '../controllers/rpaController.js';

const router = express.Router();

router.post('/fatura', faturaController);

export default router;
