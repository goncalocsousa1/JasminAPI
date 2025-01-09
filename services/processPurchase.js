import { getAccessToken } from '../scripts/token.js';

const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/invoiceReceipt/processOrders/Default`;


export const postProcessOrders= async (orderData) => {
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
            throw new Error(`Erro ao gerar a fatura para a encomenda: ${response.status} - ${errorMessage}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error("Erro ao gerar a fatura para a encomenda:", error.message);
        throw new Error("Falha ao gerar a fatura para a encomenda. Verifique os dados e o serviço.");
    }
};
