import { getAllOrdersPurchases, getOrdersPurchasesByID } from "../services/purchases.js";

export const getAllOrdersPurchasesController = async (req, res) => {
    try {
        const Items = await getAllOrdersPurchases(); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Purchases!', error: error.message });
    }
};
export const getAllOrdersPurchasesIDController = async (req, res) => {
    const { ID } = req.params;  
    try {
        const Items = await getOrdersPurchasesByID(ID); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Purchases!', error: error.message });
    }
};

export const createOrderPurchaseController = async (req, res) => {
    const orderData = req.body;  
    try {
        const newOrder = await postOrder(orderData);  
        res.status(201).json(newOrder);     
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a encomenda!', error: error.message });
    }
};
