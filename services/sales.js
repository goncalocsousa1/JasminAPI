import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/salesCore/salesItems/extension/`;

export const getAllSalesItem = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/oData?$select=baseEntityId,itemKey&$expand=priceListLines($select=priceAmountAmount)`;

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
        console.error("Erro ao obter os artigos para venda:", error.message);
        throw new Error("Falha ao buscar os artigos para venda. Verifique o serviço e a URL.");
    }
};