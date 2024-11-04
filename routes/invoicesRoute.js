import express from 'express'
import { getAllinvoices } from '../controllers/jasminController';
const router = express.Router();

router.get('/invoices', getAllinvoices);