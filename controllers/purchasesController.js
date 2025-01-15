import { getAllOrdersPurchases, getOrdersPurchasesByID, postPurchaseOrder, deletePurchase, getAllSuppliers} from "../services/purchases.js";

export const getAllOrdersPurchasesController = async (req, res) => {
    try {
        const Items = await getAllOrdersPurchases(); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Purchases!', error: error.message });
    }
};
export const getAllOrdersPurchasesIDController = async (req, res) => {
    const { ID } = req.params;  
    try {
        const Items = await getOrdersPurchasesByID(ID); 
        
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar Purchases pelo id!', error: error.message });
    }
};

export const createOrderPurchaseController = async (req, res) => {
    const orderData = req.body;  
    
    const newOrderObj = {
        "company": orderData.company,
        "documentType": orderData.documentType,
        "sellerSupplierParty": orderData.sellerSupplierParty,
        "SellerSupplierPartyName": orderData.SellerSupplierPartyName,
        "documentDate": "2025-01-19T04:10:22.154Z",
        "deliveryTerm": orderData.deliveryTerm,
        "PaymentMethod": orderData.PaymentMethod,
        "PaymentTerm": orderData.PaymentTerm,
        "LoadingCountry": orderData.LoadingCountry,
        "AccountingParty": orderData.AccountingParty,
        "documentLines": [
          {
            "purchasesItem": orderData.purchasesItem,
            "quantity": orderData.quantity,
            "unitPrice": {
              "amount": orderData.amount,
              "baseAmount": orderData.baseAmount,
              "reportingAmount": orderData.reportingAmount,
              "fractionDigits": orderData.fractionDigits,
              "symbol": orderData.symbol
            }
          }
        ]
      }

      console.log(newOrderObj);

      newOrderObj.documentLines.forEach(line => {
        console.log(line.unitPrice.amount);
        console.log(line.unitPrice.baseAmount);
        console.log(line.unitPrice.reportingAmount);
    });

    try {
        const newOrder = await postPurchaseOrder(newOrderObj);  
        res.status(201).json(newOrder);     
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar a encomenda!', error: error.message });
    }
};

export const deletePurchaseByParamsController = async (req, res) => {
    const { companyKey, documentType, year, month } = req.params;

    try {
        const deletedOrder = await deletePurchase(companyKey, documentType, year, month); 
        res.status(200).json(deletedOrder); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao eliminar encomenda específica!', error: error.message });
    }
};
export const getAllSuppliersController = async (req, res) => {
    try {
        const Items = await getAllSuppliers(); 
        res.status(200).json(Items);  
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar os fornecedores!', error: error.message });
    }
};                                           