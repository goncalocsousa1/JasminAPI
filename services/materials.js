import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/materialscore/materialsitems`;

export const getAllMaterials = async () => {
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
        console.error("Erro ao obter todos os produtos:", error.message);
        throw new Error("Falha ao buscar produtos. Verifique o serviço e a URL.");
    }
};

export const getMaterialByKey = async (itemKey) => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/${itemKey}`;

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
        console.error(`Erro ao obter o material com itemKey ${itemKey}:`, error.message);
        throw new Error("Falha ao buscar o material específico. Verifique o serviço e a URL.");
    }
};