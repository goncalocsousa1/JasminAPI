// routes/invoicesRoute.js
import express from 'express';
import { getAllinvoices, getInvoiceByParamsController, getInvoiceByIDController, getInvoiceReportController} from '../controllers/invoicesClientController.js';

const router = express.Router();

router.get('/', getAllinvoices); // Rota para obter as faturas
router.get('/:companyKey/:documentType/:year/:month', getInvoiceByParamsController); // Rota para obter a fatura específica
router.get('/:id/report', getInvoiceReportController); // Rota para obter o report da fatura específica
router.get('/:id', getInvoiceByIDController); // Rota para obter a fatura específica pelo ID


export default router;
