import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/billing/invoices`;

export const getAllInvoices = async () => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/odata?$select=postingDate,buyerCustomerPartyName,accountingPartyTaxId,payableAmountAmount`;

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
        console.error("Erro ao obter todas as faturas:", error.message);
        throw new Error("Falha ao buscar faturas. Verifique o serviço e a URL.");
    }
};

export const getInvoiceByParams = async (companyKey, documentType, year, month) => {
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
        console.error("Erro ao obter fatura específica:", error.message);
        throw new Error("Falha ao buscar fatura específica. Verifique o serviço e a URL.");
    }
};

export const getInvoiceByID = async (id) => {
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
        console.error("Erro ao obter fatura específica:", error.message);
        throw new Error("Falha ao buscar fatura específica. Verifique o serviço e a URL.");
    }
};

export const getInvoiceReport = async (id) => {
    const token = await getAccessToken();
    const url = `${BASE_URL}/${id}/printOriginal?template=Billing_MaterialsInvoiceReport`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Erro na resposta: ${response.status} - ${errorDetail}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        return buffer;
    } catch (error) {
        console.error("Erro ao obter o relatório da fatura específica:", error.message);
        throw new Error("Falha ao buscar o relatório da fatura. Verifique o serviço e a URL.");
    }
};

