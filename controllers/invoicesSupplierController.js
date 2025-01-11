import { getAllInvoices, getInvoiceByParams, getInvoiceByID, getInvoiceReport } from "../services/invoicesSupplier.js";

export const getAllinvoices = async (req, res) => {
    try {
        const invoices = await getAllInvoices(); 
        res.status(200).json(invoices); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar faturas do fornecedor!', error: error.message });
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

export const getInvoiceByIDController = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await getInvoiceByID(id); 
        res.status(200).json(invoice); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar fatura!', error: error.message });
    }
};

export const getInvoiceReportController = async (req, res) => {
    const { id } = req.params;
    try {
        const pdfBuffer = await getInvoiceReport(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename=invoice_${id}.pdf`);
        res.status(200).send(pdfBuffer);
    } catch (error) {
        console.error("Erro ao buscar o relatório da fatura:", error.message);
        res.status(500).json({ message: 'Erro ao buscar o relatório da fatura!', error: error.message });
    }
};
