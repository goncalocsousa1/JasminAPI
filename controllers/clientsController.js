import { getAllClients, getClientbykey, createClient } from "../services/clients.js";

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