import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/salesCore/customerParties`;

export const getAllClients = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata`;

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
        console.error("Erro ao obter todos os clientes:", error.message);
        throw new Error("Falha ao buscar cliente. Verifique o serviço e a URL.");
    }
};

export const getClientbykey = async (key) => {
    const token = await getAccessToken();

    const url = `${BASE_URL}/${key}`;

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
        console.error("Erro ao obter cliente específico:", error.message);
        throw new Error("Falha ao buscar cliente específico. Verifique o serviço e a URL.");
    }
};