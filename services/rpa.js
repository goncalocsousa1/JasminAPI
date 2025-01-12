// services/rpa.js
import { getUiPathAccessToken } from '../scripts/uipath-token.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = "https://cloud.uipath.com/iegknhvui/DefaultTenant/orchestrator_/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs";


export const enviarFatura = async (nomeFatura, email) => {
    try {
        // Tenta obter o token primeiro
        const token = await getUiPathAccessToken();
        if (!token) {
            throw new Error("Não foi possível obter o token de autenticação");
        }
        console.log(process.env.ORGANIZATION_UNIT_ID);
        const bodyData = {
            startInfo: {
                ReleaseKey: process.env.RELEASE_KEY_INVOICE,
                Strategy: "ModernJobsCount",
                RobotIds: [],
                NoOfRobots: 1,
                InputArguments: JSON.stringify({
                    NomeFatura: nomeFatura,
                    Email: email
                })
            }
        };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-UIPATH-OrganizationUnitId': process.env.ORGANIZATION_UNIT_ID
            },
            body: JSON.stringify(bodyData)
        });

        if (response.status === 401) {
            throw new Error("Token de autenticação expirado ou inválido");
        }

        if (!response.ok) {
            const errorDetail = await response.text();
            throw new Error(`Erro na resposta: ${response.status} - ${errorDetail}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao iniciar job RPA:", error.message);
        if (error.message.includes("token")) {
            throw new Error("Erro de autenticação. Por favor, verifique as credenciais.");
        }
        throw new Error("Falha ao iniciar o processo RPA. Verifique as configurações e tente novamente.");
    }
};

export const enviarRecibo = async (nomeRecibo, email) => {
    try {
        const token = await getUiPathAccessToken();
        if (!token) {
            throw new Error("Não foi possível obter o token de autenticação");
        }

        const bodyData = {
            startInfo: {
                ReleaseKey: process.env.RELEASE_KEY_RECEIPT,
                Strategy: "ModernJobsCount",
                RobotIds: [],
                NoOfRobots: 1,
                InputArguments: JSON.stringify({
                    NomeRecibo: nomeRecibo,
                    Email: email
                })
            }
        };

        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-UIPATH-OrganizationUnitId': process.env.ORGANIZATION_UNIT_ID
            },
            body: JSON.stringify(bodyData)
        });

        if (response.status === 401) {
            throw new Error("Token de autenticação expirado ou inválido");
        }
        const responseText = await response.text();

        try {
            const jsonResponse = JSON.parse(responseText);
            return jsonResponse;
        } catch (parseError) {
            console.error("Erro ao interpretar resposta JSON:", parseError.message);
            console.error("Conteúdo da resposta:", responseText);
            throw new Error("A resposta do servidor não é válida JSON.");
        }

    } catch (error) {
        console.error("Erro ao iniciar job RPA:", error.message);
        if (error.message.includes("token")) {
            throw new Error("Erro de autenticação. Por favor, verifique as credenciais.");
        }
        throw new Error("Falha ao iniciar o processo RPA. Verifique as configurações e tente novamente.");
    }
};