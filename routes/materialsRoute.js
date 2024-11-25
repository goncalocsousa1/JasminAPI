import express from 'express';
import { getAllMaterialsController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllMaterialsController); // Rota para obter as orders
export default router;
