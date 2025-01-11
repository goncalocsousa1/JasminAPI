import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/materialscore/materialsitems`;
const IMAGE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/businesscore/items`;

export const getAllMaterials = async () => {
    const token = await getAccessToken();
    const materialsUrl = `${BASE_URL}/odata`;
    const salesItemsUrl = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/salesCore/salesItems/extension/odata`;

    try {
        const [materialsResponse, salesItemResponse] = await Promise.all([
            fetch(materialsUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }),
            fetch(salesItemsUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }),
        ]);

        if (!materialsResponse.ok) {
            const errorDetail = await materialsResponse.text();
            throw new Error(`Erro na resposta dos materiais: ${materialsResponse.status} - ${errorDetail}`);
        }

        if (!salesItemResponse.ok) {
            const errorDetail = await salesItemResponse.text();
            throw new Error(`Erro na resposta dos itens de vendas: ${salesItemResponse.status} - ${errorDetail}`);
        }

        const materialsData = await materialsResponse.json();
        const salesData = await salesItemResponse.json();

        const salesPricesMap = new Map(
            salesData.items.map(item => {
                const priceItem = item.priceListLines && item.priceListLines[0];
                return [
                    item.baseEntityId,
                    priceItem ? priceItem.priceAmountAmount : 0
                ];
            })
        );

        const itemsWithImagesAndPrices = await Promise.all(
            materialsData.items.map(async (item) => {
                let updatedItem = {};

                updatedItem.itemKey = item.itemKey || null;
                updatedItem.maxStock = item.maxStock || 0; 
                updatedItem.stockBalance = (item.materialsItemWarehouses && item.materialsItemWarehouses[0]) 
                    ? item.materialsItemWarehouses[0].stockBalance 
                    : 0; 
                updatedItem.minStock = item.minStock || 0;
                updatedItem.description = item.description || '';
                updatedItem.availableInSales = item.availableInSales || false;
                updatedItem.assortment = item.assortment || '';
                updatedItem.brand = item.brand || '';
                updatedItem.brandId = item.brandId || null;
                updatedItem.brandModel = item.brandModel || '';
                updatedItem.itemType = item.itemType || '';
                updatedItem.baseEntityId = item.baseEntityId || '';
                updatedItem.id = item.id || null;
                updatedItem.isActive = item.isActive || false;
                updatedItem.createdBy = item.createdBy || '';
                updatedItem.createdOn = item.createdOn || null;

                updatedItem.price = salesPricesMap.get(item.baseEntityId) || 0;

                // Adiciona imagem
                if (item.baseEntityId) {
                    try {
                        const imageResponse = await getMaterialImageById(item.baseEntityId);
                        updatedItem.image = imageResponse.image || null;
                    } catch (error) {
                        updatedItem.image = null;
                    }
                }

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