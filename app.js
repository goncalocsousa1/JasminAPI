// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import invoicesRoute from './routes/invoicesRoute.js'; 
import ordersRoute from './routes/ordersRoute.js'; 
import  clientsRoute from './routes/clientsRoute.js';
import  materialsRoute from './routes/materialsRoute.js';
import  purchasesRoute from './routes/purchasesRoute.js';
import  salesRoute from './routes/salesRoute.js';
import processordersRoute  from './routes/processordersRoute.js';
import processsalesRoute from './routes/processsalesRoute.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Usa o roteador montado para a rota /invoices
app.use('/invoices', invoicesRoute);
// Usa o roteador montado para a rota /invoices
app.use('/orders', ordersRoute);
// Usa o roteador montado para a rota /invoices
app.use('/processSales', processsalesRoute);
//Rota para ir buscar cliente
app.use('/clients', clientsRoute);
//Rota para ir buscar item
app.use('/materials', materialsRoute);
// Usa o roteador montado para a rota /purchases
app.use('/purchases', purchasesRoute);
// Usa o roteador montado para a rota /processOrders
app.use('/processPurchases', processordersRoute);
// Usa o roteador montado para a rota /salesItems
app.use('/salesItems', salesRoute);
const port = 9090;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
