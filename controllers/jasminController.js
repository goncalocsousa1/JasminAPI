import {} from './services/jasminService.js'; // usar o controller para chamar o serviço e devolver o result. ao frontend;

export const getAllinvoices = async (req, res) => {

    try{

        const invoices = await getAllinvoices();
        //res.json(posts);
        res.status(200).send({
            invoices
        })

    }catch(error) {
        res.status(500).json({message: 'Error fetching invoices!'});
    }

};
