// routes/invoicesRoute.js
import express from 'express';
import { getAllinvoices, getInvoiceByParamsController } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/', getAllinvoices); // Rota para obter as faturas
router.get('/:companyKey/:documentType/:year/:month', getInvoiceByParamsController); // Rota para obter a fatura específica

export default router;
