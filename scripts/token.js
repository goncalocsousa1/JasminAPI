// Imports
import fs from 'fs';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configurações
const TOKEN_URL = "https://identity.primaverabss.com/connect/token";
const BASE_URL = `https://my.jasminsoftware.com/api/${process.env.TENANT}/${process.env.ORGANIZATION}/billing/invoices/DEFAULT/`;
const CLIENT_ID = process.env.CLIENT_ID; 
const CLIENT_SECRET = process.env.CLIENT_SECRET; 
const TOKEN_FILE = 'token.json'; 


// Função para carregar o token do arquivo
function loadTokenFromFile() {
    if (fs.existsSync(TOKEN_FILE)) {
        const data = fs.readFileSync(TOKEN_FILE, 'utf8');
        try {
            const parsedData = JSON.parse(data);
            if (!parsedData.access_token || !parsedData.expires_at) {
                throw new Error("Token ou data de expiração ausentes no arquivo.");
            }
            return parsedData;
        } catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return null;
        }
    }
    return null;
}

// Função para salvar o token no arquivo
function saveTokenToFile(tokenData) {
    fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
}

// Função para obter o token de acesso
export async function getAccessToken() {
    const now = Date.now();
    const storedTokenData = loadTokenFromFile();

    if (storedTokenData && storedTokenData.expires_at > now) {
        console.log("Token válido encontrado, usando o token existente.");
        return storedTokenData.access_token;
    }

    console.log("Solicitando um novo token...");

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
    const expiresAt = now + (data.expires_in * 1000); 

    const tokenData = {
        access_token: data.access_token,
        expires_at: expiresAt
    };
    saveTokenToFile(tokenData);
    console.log("Novo token gerado e salvo com sucesso.");
    return data.access_token;
}

