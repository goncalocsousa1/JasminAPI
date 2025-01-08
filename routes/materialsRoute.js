import express from 'express';
import { getAllMaterialsController, getMaterialByIdController, getMaterialByKeyController, getMaterialImageByIdController } from '../controllers/materialsController.js';

const router = express.Router();

router.get('/', getAllMaterialsController); // Rota para obter  materials
router.get('/:itemKey', getMaterialByKeyController); // Rota para obter materials by key
router.get('/:id/image', getMaterialImageByIdController);
router.get('/:id', getMaterialByIdController); // Rota para obter materials by id
export default router;
