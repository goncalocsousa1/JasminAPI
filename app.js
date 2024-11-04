import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { getAllinvoices } from './routes/invoicesRoute.js';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); //middleware


app.use('/auth', getAuth);
app.use('/invoices', getAllinvoices);


const port = 8080
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`)
})