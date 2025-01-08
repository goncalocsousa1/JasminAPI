import { getAllMaterials, getMaterialByKey, getMaterialById, getMaterialImageById } from "../services/materials.js";

export const getAllMaterialsController = async (req, res) => {
    try {
        const Items = await getAllMaterials(); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Itens!', error: error.message });
    }
};

export const getMaterialByKeyController = async (req, res) => {
    const { itemKey } = req.params;

    try {
        const material = await getMaterialByKey(itemKey);
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar o material com itemKey ${itemKey}`, error: error.message });
    }
};
export const getMaterialByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await getMaterialById(id);
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar o material com itemKey ${id}`, error: error.message });
    }
};
export const getMaterialImageByIdController = async (req, res) => {
    const { id } = req.params;

    try {
        const material = await getMaterialImageById(id);
        //const image = material;
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar a imagem do material com itemKey ${id}`, error: error.message });
    }
};
