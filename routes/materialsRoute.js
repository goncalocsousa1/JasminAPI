import express from 'express';
import { getAllMaterialsController, getMaterialByKeyController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllMaterialsController); // Rota para obter  materials
router.get('/:itemKey', getMaterialByKeyController); // Rota para obter materials by key
export default router;
