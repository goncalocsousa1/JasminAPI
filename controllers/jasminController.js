// jasminController.js
import { getAllInvoices } from "../services/jasminservice.js";

export const getAllinvoices = async (req, res) => {
    try {
        const invoices = await getAllInvoices(); // Chama o serviço
        res.status(200).send({
            invoices
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invoices!' });
    }
};
