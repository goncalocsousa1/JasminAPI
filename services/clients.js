import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/salesCore/customerParties`;

export const getAllClients = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata?$select=*`;

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
        throw new Error("Falha ao buscar clientes. Verifique o serviço e a URL.");
    }
};


export const getClientbykey = async (key) => {
    const url = `${BASE_URL}/${key}`;
    let token = await getAccessToken();

    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Token inválido: gere um novo e tente novamente
        if (response.status === 401) {
            console.warn("Token expirado ou inválido. Gerando um novo token...");
            token = await getAccessToken(true);
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        }

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Erro na resposta: ${response.status} - ${errorDetail}`);
        }

        const clientData = await response.json();
        return filterClientData(clientData); // Filtrar os dados antes de retornar
    } catch (error) {
        console.error("Erro ao obter cliente específico:", error.message);
        throw new Error("Falha ao obter cliente específico. Verifique o serviço e a URL.");
    }
};


export const createClient = async (clientData) => {
    const token = await getAccessToken();
    const url = `${BASE_URL}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData),
        });

        if (!response || !response.ok) {
            const errorDetail = response ? await response.text() : 'Nenhuma resposta do servidor';
            throw new Error(`Erro na resposta: ${response?.status || 'desconhecido'} - ${errorDetail}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao criar cliente:", error.message);
        throw new Error("Falha ao criar cliente. Verifique o serviço e a URL.");
    }
};

export const filterClientData = (clientData) => {
    return {
        id: clientData.id,
        name: clientData.name,
        email: clientData.electronicMail || null,
        telephone: clientData.telephone || null,
        mobile: clientData.mobile || null,
        contactName: clientData.contactName || null,
        createdOn: clientData.createdOn,
        modifiedOn: clientData.modifiedOn,
        country: {
            code: clientData.country,
            description: clientData.countryDescription,
        },
        city: clientData.cityName,
        address: `${clientData.streetName || ''} ${clientData.buildingNumber || ''}`.trim(),
        postalZone: clientData.postalZone || null,
        paymentMethod: {
            code: clientData.paymentMethod,
            description: clientData.paymentMethodDescription,
        },
        customerGroup: {
            code: clientData.customerGroup,
            description: clientData.customerGroupDescription,
        },
        isActive: clientData.isActive,
    };
};
