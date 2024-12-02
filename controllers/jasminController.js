import { getAllInvoices, getInvoiceByParams } from "../services/invoices.js"; 
import { getAllOrders, getOrdersByParams , postOrder} from "../services/order.js"; 
import { getAllClients , getClientbykey, createClient} from "../services/clients.js"; 
import { getAllMaterials, getMaterialByKey, getMaterialById} from "../services/materials.js"; 

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

export const createOrderController = async (req, res) => {
    const orderData = req.body;  

    try {
        const newOrder = await postOrder(orderData);  
        res.status(201).json(newOrder);     
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a encomenda!', error: error.message });
    }
};

export const getAllClientsController = async (req, res) => {
    try {
        const clients = await getAllClients(); 
        res.status(200).json(clients); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar clientes!', error: error.message });
    }
};
export const getClientByKeyController = async (req, res) => {
    const { key } = req.params;  

    try {
        const client = await getClientbykey(key); 
        res.status(200).json(client); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cliente!', error: error.message });
    }
};

export const createClientController = async (req,res) => {
    const clientData = req.body;  

    try {
        const newClient= await createClient(clientData);  
        res.status(201).json(newClient);     
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar cliente!', error: error.message });
    }


};

export const getAllMaterialsController = async (req, res) => {
    try {
        const Items = await getAllMaterials(); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Itens!', error: error.message });
    }
};

export const getMaterialByKeyController = async (req, res) => {
    const { itemKey } = req.params;

    try {
        const material = await getMaterialByKey(itemKey);
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar o material com itemKey ${itemKey}`, error: error.message });
    }
};
export const getMaterialByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await getMaterialById(id);
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar o material com itemKey ${id}`, error: error.message });
    }
};

