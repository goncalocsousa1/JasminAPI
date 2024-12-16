import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/purchases/orders`;

export const getAllOrdersPurchases = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata?select=*`;

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

export const getOrdersPurchasesByID = async (ID) => {
    const token = await getAccessToken();

    const url = `${BASE_URL}/${ID}`;

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
export const postPurchaseOrder = async (orderData) => {
    const token = await getAccessToken();

    if (!token) {
        throw new Error("Token de acesso não encontrado.");
    }

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
            const errorDetail = await response.json().catch(() => response.text()); 
            const errorMessage = errorDetail?.message || `Erro desconhecido: ${response.status}`;
            throw new Error(`Erro ao criar o pedido de vendas: ${response.status} - ${errorMessage}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erro ao criar pedido de encomenda:", error.message);
        throw new Error("Falha ao enviar o pedido de encomenda. Verifique os dados e o serviço.");
    }
};
