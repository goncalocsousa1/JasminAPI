import { postProcessOrders } from "../services/processPurchase.js";

export const postProcessOrdersController = async (req, res) => {
    console.log(req.body);
    try {
        const Items = await postProcessOrders([req.body]); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar fatura para a encomenda ao fornecedor!', error: error.message });
    }
};