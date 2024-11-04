import {getAccessToken} from '../token.js';

// Função para obter todos os posts


// Função para obter todos os posts
export const getAllInvoices  = async () => {
  const token = getAccessToken();
  
  try {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Erro: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();
    console.log("Dados recebidos:", data);
} catch (error) {
    console.error("Ocorreu um erro:", error);
}

};

