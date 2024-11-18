import { getAllInvoices, getInvoiceByParams } from "../services/invoices.js"; 

export const getAllinvoices = async (req, res) => {
    try {
        const invoices = await getAllInvoices(); 
        res.status(200).json(invoices); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar faturas!', error: error.message });
    }
};

export const getInvoiceByParamsController = async (req, res) => {
    const { companyKey, documentType, year, month } = req.params;

    try {
        const invoice = await getInvoiceByParams(companyKey, documentType, year, month); 
        res.status(200).json(invoice); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar fatura!', error: error.message });
    }
};
