import { enviarFatura } from '../services/rpa.js';

export const faturaController = async (req, res) => {
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
            message: 'Erro ao iniciar o job RPA!', 
            error: error.message 
        });
    }
};