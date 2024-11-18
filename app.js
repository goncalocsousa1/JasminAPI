// app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import invoicesRoute from './routes/invoicesRoute.js'; 
import ordersRoute from './routes/ordersRoute.js'; 
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// Usa o roteador montado para a rota /invoices
app.use('/invoices', invoicesRoute);
// Usa o roteador montado para a rota /invoices
app.use('/orders', ordersRoute);
//Rota para ir buscar fatura específica

//api para ir buscar informações dos clientes
const port = 8080;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
