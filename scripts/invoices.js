import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações
const TENANT = process.env.TENANT; // Obtém o Tenant do .env
const ORGANIZATION = process.env.ORGANIZATION; // Obtém a Organization do .env
const TOKEN_URL = "https://identity.primaverabss.com/connect/token";
// Atualiza a URL da API para usar TENANT e ORGANIZATION
const API_URL = `https://my.jasminsoftware.com/api/${TENANT}/${ORGANIZATION}/billing/invoices/oData`;
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
async function fetchInvoices(token) {
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
}

// Chama as funções para obter o token e buscar as faturas
async function main() {
    try {
        const token = await getAccessToken(); // Obtém o token
        await fetchInvoices(token); // Busca as faturas usando o token
    } catch (error) {
        console.error(error);
    }
}

main();
