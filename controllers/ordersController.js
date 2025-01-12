import { getAllOrders, getOrdersByParams, postOrder, deleteOrder, getOrdersByID} from "../services/order.js";

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

export const createOrderController = async (req, res) => {
    const orderData = req.body;  
    console.log(orderData);
    try {

        const newOrderObj = {
            "company": "Default",
            "buyerCustomerParty": orderData.buyerCustomerParty,
            "deliveryTerm": orderData.deliveryTerm, 
            "documentLines": [ 
                {
                    "salesItem": orderData.salesItem, 
                    "quantity": orderData.quantity,
                    "unitPrice": {
                        "amount": orderData.amount,
                        "baseAmount": orderData.amount,
                        "reportingAmount": orderData.amount,
                        "fractionDigits": orderData.fractionDigits,
                        "symbol": orderData.symbol
                    }
                }
            ]
        }
        const newOrder = await postOrder(newOrderObj);  
        res.status(201).json(newOrder);     
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a encomenda!', error: error.message });
    }
};
export const deleteOrderByParamsController = async (req, res) => {
    const { companyKey, documentType, year, month } = req.params;

    try {
        const deletedOrder = await deleteOrder(companyKey, documentType, year, month); 
        res.status(200).json(deletedOrder); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao eliminar encomenda específica!', error: error.message });
    }
};


export const getOrderByIDController = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await getOrdersByID(id); 
        res.status(200).json(order); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar encomenda por id!', error: error.message });
    }
};