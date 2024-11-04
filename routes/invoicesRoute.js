import express from 'express';
import { getAllinvoices } from '../controllers/jasminController.js';

const router = express.Router();

router.get('/invoices', getAllinvoices);

export default router;
