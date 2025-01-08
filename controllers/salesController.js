import { getAllSalesItem,} from "../services/sales.js";

export const getAllSaleItemsController = async (req, res) => {
    try {
        const clients = await getAllSalesItem(); 
        res.status(200).json(clients); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar artigos de venda!', error: error.message });
    }
};