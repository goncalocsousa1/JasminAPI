// routes/invoicesRoute.js
import express from 'express';
import { getAllOrdersController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllOrdersController); // Rota para obter as orders

export default router;
