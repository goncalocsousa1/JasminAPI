import { getAllInvoices, getInvoiceByParams } from "../services/invoices.js"; 
import { getAllOrders, getOrdersByParams } from "../services/order.js"; 

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

export const getAllOrdersController = async (req, res) => {
    try {
        const invoices = await getAllOrders(); 
        res.status(200).json(invoices); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar as encomendas!', error: error.message });
    }
};
export const getOrderByParamsController = async (req, res) => {
    const { companyKey, documentType, year, month } = req.params;

    try {
        const order = await getOrdersByParams(companyKey, documentType, year, month); 
        res.status(200).json(order); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar encomenda!', error: error.message });
    }
};


