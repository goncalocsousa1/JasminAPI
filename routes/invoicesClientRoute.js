// routes/invoicesRoute.js
import express from 'express';
import { getAllinvoices, getInvoiceByParamsController, getInvoiceByIDController, getInvoiceReportController, generateReceiptController, getInvoiceNaturalKeyByIDController, getReceiptNaturalKeyByIDController} from '../controllers/invoicesClientController.js';

const router = express.Router();

router.post('/receipts', generateReceiptController); // Rota para obter as faturas
router.get('/', getAllinvoices); // Rota para obter as faturas
router.get('/:companyKey/:documentType/:year/:month', getInvoiceByParamsController); // Rota para obter a fatura específica
router.get('/:id/report', getInvoiceReportController); // Rota para obter o report da fatura específica
router.get('/:id', getInvoiceByIDController); // Rota para obter a fatura específica pelo ID
router.get('/:id/naturalkey', getInvoiceNaturalKeyByIDController); // Rota para obter a fatura específica pelo ID
router.get('/:id/Receiptnaturalkey', getReceiptNaturalKeyByIDController); // Rota para obter a fatura específica pelo ID


export default router;
