// services/rpa.js
import { getUiPathAccessToken } from '../scripts/uipath-token.js';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = "https://cloud.uipath.com/iegknhvui/DefaultTenant/orchestrator_/odata/Jobs/UiPath.Server.Configuration.OData.StartJobs";
const ORGANIZATION_UNIT_ID = "5900835";
const RELEASE_KEY = "ce8376ce-3252-408c-99c7-e154afaadc65";

export const enviarFatura = async (nomeFatura, email) => {
    try {
        // Tenta obter o token primeiro
        const token = await getUiPathAccessToken();
        if (!token) {
            throw new Error("Não foi possível obter o token de autenticação");
        }

        const bodyData = {
            startInfo: {
                ReleaseKey: RELEASE_KEY,
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
                'X-UIPATH-OrganizationUnitId': ORGANIZATION_UNIT_ID
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