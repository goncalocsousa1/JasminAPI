//neste código deve-se executar a passar o document type, serie e o seriesNumber
//exemplo node specific_invoice.js FA/2024/1

import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações
const TOKEN_URL = "https://identity.primaverabss.com/connect/token";
const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/billing/invoices/DEFAULT/`; // Base da URL
const CLIENT_ID = process.env.CLIENT_ID; // Obtém o Client ID do .env
const CLIENT_SECRET = process.env.CLIENT_SECRET; // Obtém o Client Secret do .env

// Função para obter o token de acesso
async function getAccessToken() {
    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: 'application'
        })
    });

    if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(`Erro ao obter token: ${response.status} - ${errorDetail}`);
    }

    const data = await response.json();
    return data.access_token; // Retorna o token de acesso
}

// Função para buscar as faturas
async function fetchInvoices(token, documentType, series, seriesNumber) {
    // Cria a URL com as variáveis
    const apiUrl = `${BASE_URL}/${documentType}/${series}/${seriesNumber}`;

    try {
        const response = await fetch(apiUrl, {
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
}

// Chama as funções para obter o token e buscar as faturas
async function main() {
    try {
        const token = await getAccessToken(); // Obtém o token

        // Obtém o parâmetro da linha de comando
        const invoiceParams = process.argv[2]; // O único argumento, formato: FA/2024/1

        // Valida o parâmetro
        if (!invoiceParams) {
            throw new Error("Por favor, forneça os parâmetros no formato: documentType/serie/seriesNumber.");
        }

        // Divide o argumento em documentType, serie e seriesNumber
        const [documentType, series, seriesNumber] = invoiceParams.split('/');

        // Valida as partes
        if (!documentType || !series || !seriesNumber) {
            throw new Error("Os parâmetros fornecidos estão incompletos. Certifique-se de que está no formato: documentType/serie/seriesNumber.");
        }

        await fetchInvoices(token, documentType, series, seriesNumber); // Busca as faturas usando o token
    } catch (error) {
        console.error(error);
    }
}

main();
