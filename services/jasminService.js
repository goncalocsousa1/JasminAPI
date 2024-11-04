// Importa a função getAccessToken do arquivo de scripts
import { getAccessToken } from '../scripts/token.js';

// Definição da URL da API com base nas variáveis de ambiente
const API_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/billing/invoices/oData`;

// Função para obter todas as faturas
export const getAllInvoices = async (token) => {
    console.log("Token de acesso:", token); // Log do token recebido
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
        console.log("Dados recebidos:", data); // Log dos dados recebidos
    } catch (error) {
        console.error("Ocorreu um erro:", error); // Log de erro
    }
};

// Função principal
async function main() {
    try {
        const token = await getAccessToken(); // Obtém o token
        await getAllInvoices(token); // Busca as faturas usando o token
    } catch (error) {
        console.error("Erro na função main:", error); // Log de erro na função main
    }
}

// Executa a função principal
main();
