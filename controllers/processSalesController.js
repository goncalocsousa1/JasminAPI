import { postSalesOrders } from "../services/processSales.js";

export const postProcessSalesController = async (req, res) => {
    try {
        const Items = await postSalesOrders(req.body); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar fatura para a venda do cliente!', error: error.message });
    }
};