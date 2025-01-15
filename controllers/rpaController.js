import { enviarFatura, enviarRecibo } from '../services/rpa.js';

export const faturaController = async (req, res) => {
    console.log(req.body);
    try {
        const { nomeFatura, email } = req.body;
        
        if (!nomeFatura || !email) {
            return res.status(400).json({ 
                message: 'Necessário fornecer nomeFatura e email!' 
            });
        }

        const result = await enviarFatura(nomeFatura, email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao iniciar o RPA para enviar fatura!', 
            error: error.message 
        });
    }
};

export const reciboController = async (req, res) => {
    console.log(req.body);
    try {
        const { nomeRecibo, email } = req.body;
        
        if (!nomeRecibo || !email) {
            return res.status(400).json({ 
                message: 'Necessário fornecer nomeRecibo e email!' 
            });
        }

        const result = await enviarRecibo(nomeRecibo, email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ 
            message: 'Erro ao iniciar o RPA para enviar recibo!', 
            error: error.message 
        });
    }
};