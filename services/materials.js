import { getAccessToken } from '../scripts/token.js';
import { getAllSalesItem } from './sales.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/materialscore/materialsitems`;
const IMAGE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/businesscore/items`;

export const getAllMaterials = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata?$select=*`;

    try {
        // Obtém os materiais e os dados de vendas em paralelo
        const [materialsResponse, salesData] = await Promise.all([
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }),
            getAllSalesItem()
        ]);

        if (!materialsResponse || !materialsResponse.ok) {
            const errorDetail = materialsResponse ? await materialsResponse.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${materialsResponse?.status || 'desconhecido'} - ${errorDetail}`);
        }

        const materialsData = await materialsResponse.json();

        // Cria um mapa dos preços por baseEntityId, pegando apenas o primeiro preço
        const pricesMap = new Map(
            salesData.items.map(item => [
                item.baseEntityId,
                item.priceListLines[0]?.priceAmountAmount || 0 // Pega apenas o primeiro preço ou 0 se não existir
            ])
        );

        // Processa imagens e adiciona preços
        const itemsWithImagesAndPrices = await Promise.all(
            materialsData.items.map(async (item) => {
                let updatedItem = { ...item };

                // Adiciona imagem se existir
                if (item.image) {
                    try {
                        const imageResponse = await getMaterialImageById(item.baseEntityId);
                        updatedItem.image = imageResponse.image;
                    } catch (error) {
                        console.error(`Erro ao obter a imagem para o item ${item.baseEntityId}:`, error.message);
                    }
                }

                // Adiciona o preço
                updatedItem.price = pricesMap.get(item.baseEntityId) || 0;

                return updatedItem;
            })
        );

        return { items: itemsWithImagesAndPrices };
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
export const getMaterialById = async (id) => {
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

        return await response.json();
    } catch (error) {
        console.error(`Erro ao obter o material com o id ${id}:`, error.message);
        throw new Error("Falha ao buscar o material específico. Verifique o serviço e a URL.");
    }
};

export const getMaterialImageById = async (id) => {
    const token = await getAccessToken();
    const url = `${IMAGE_URL}/${id}/Image?fileName=image.png`;

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
        //const imageUrl = URL.createObjectURL(imageData); 

        return {
            id: id, // Retorna o ID junto com a imagem
            image: data.fileContents
        };

        //console.log(toString(response));
        //return await response.json();
    } catch (error) {
        console.error(`Erro ao obter a imagem do material com o id ${id}:`, error.message);
        throw new Error("Falha ao buscar a imagem do material específico. Verifique o serviço e a URL.");
    }
};