import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/sales/orders`;

export const getAllOrders = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata?$select=naturalKey,id,buyerCustomerParty,buyerCustomerPartyTaxId,buyerCustomerPartyName,payableAmountAmount`;

    try {

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response || !response.ok) { 
            const errorDetail = response ? await response.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${response?.status || 'desconhecido'} - ${errorDetail}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erro ao obter todas as encomendas:", error.message);
        throw new Error("Falha ao buscar encomendas. Verifique o serviço e a URL.");
    }
};

export const getOrdersByParams = async (companyKey, documentType, year, month) => {
    const token = await getAccessToken();

    const url = `${BASE_URL}/${companyKey}/${documentType}/${year}/${month}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response || !response.ok) {
            const errorDetail = response ? await response.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${response?.status || 'desconhecido'} - ${errorDetail}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao obter encomenda específica:", error.message);
        throw new Error("Falha ao buscar encomenda específica. Verifique o serviço e a URL.");
    }
};

export const postOrder  = async (orderData) => {
    const token = await getAccessToken();  

    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),  
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Erro ao criar o pedido de vendas: ${response.status} - ${errorDetail}`);
        }

        return await response.json();  
    } catch (error) {
        console.error("Erro ao criar pedido de vendas:", error.message);
        throw new Error("Falha ao enviar o pedido de vendas. Verifique os dados e o serviço.");
    }
};

export const deleteOrder  = async (companyKey, documentType, year, month) => {
    const token = await getAccessToken();  
    const url = `${BASE_URL}/${companyKey}/${documentType}/${year}/${month}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response || !response.ok) {
            const errorDetail = response ? await response.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${response?.status || 'desconhecido'} - ${errorDetail}`);
        }

        return { message: 'Encomenda de cliente eliminada com sucesso!' }; 
    } catch (error) {
        console.error("Erro ao eliminar encomenda específica.:", error.message);
        throw new Error("Falha ao buscar encomenda específica. Verifique o serviço e a URL.");
    }
};

export const getOrdersByID = async (id) => {
    const token = await getAccessToken();

    const url = `${BASE_URL}/${id}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response || !response.ok) {
            const errorDetail = response ? await response.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${response?.status || 'desconhecido'} - ${errorDetail}`);
        }

        const data = await response.json();

        return data.naturalKey;
    } catch (error) {
        console.error("Erro ao obter encomenda específica por id:", error.message);
        throw new Error("Falha ao buscar encomenda específica por id. Verifique o serviço e a URL.");
    }
};
