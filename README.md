# JasminAPI

Esta API foi desenvolvida no âmbito de um projeto académico na disciplina de Integração da Empresa. O tema escolhido foi venda automóvel, onde o frontend será implementado em Mendix, a gestão de faturas será realizada no Jasmin, e esta API foi criada para possibilitar a integração e gestão de clientes, encomendas, materiais e faturas.

A seguir, apresenta-se a descrição detalhada de todos os métodos disponíveis, organizados por categoria.

## **Autenticação**

A autenticação é necessária para aceder a todos os endpoints. Para isso tem de adicionar um ficheiro .env ao seu programa com as seguintes variáveis:
```
TENANT
ORGANIZATION
CLIENT_ID
CLIENT_SECRET
```
Depois é também preciso criar um token.js onde terá de conter o seguinte:
```
{
  "access_token": "Token",
  "expires_at": data em milisegundos
}
```

## **EndPoints**
### **Faturas (Invoices)**

#### `GET AllInvoices`

- **Descrição:** Obtém uma lista de todas as faturas.
- **Exemplo de URL:** `/invoices/allinvoices`

#### `GET InvoicesByKey`

- **Descrição:** Obtém detalhes de uma fatura específica através de uma chave única.
- **Exemplo de URL:** `/invoices/invoicesbykey/{key}`

### **Encomendas (Orders)**

#### `POST CreateOrder`

- **Descrição:** Cria uma nova encomenda no sistema.
- **Exemplo de URL:** `/orders/createorder`
- **Exemplo de corpo (body):**

```
{
  "company": "Default",                         // Empresa onde a encomenda será criada
  "buyerCustomerParty": "0004",     // Chave única do cliente
  "deliveryTerm": "Transp",               // Termo de entrega: Levantamento na Loja
  "documentLines": [                            // Linhas do documento, uma para cada artigo
    {
      "salesItem": "YARIS"                      // Artigo: Chave única do item
    }
  ]
}

```
#### `GET getAllOrders`

- **Descrição:** Obtém uma lista de todas as encomendas.
- **Exemplo de URL:** `/orders/getallorders`

#### `GET getSpecificOrder`

- **Descrição:** Obtém detalhes de uma encomenda específica através de uma chave única.
- **Exemplo de URL:** `/orders/getspecificorder/{key}`

### **Clientes (Client)**

#### `POST CreateClient`

- **Descrição:** Cria um novo cliente no sistema.
- **Exemplo de URL:** `/client/createclient`
- **Exemplo de corpo (body):**
```
{

    "partyKey": "Teste",                         // Key do cliente
    "name": "Teste",                             // Nome do cliente
    "isExternallyManaged": false,                // Indica se é gerenciado externamente
    "currency": "EUR",                           // Moeda padrão
    "isPerson": true,                            // Indica se a entidade é uma pessoa
    "companyTaxID": "123456789",
    "customerGroup": "02",                       // Grupo do cliente (exemplo: Clientes profissionais e empresários)
    "paymentMethod": "TRA",                      // Método de pagamento (Transferência)
    "paymentTerm": "01",                         // Termos de pagamento (30 dias após emissão documento)
    "partyTaxSchema": "CONTINENTE",              // Esquema de imposto (Portugal Continental)
    "locked": false,                             // Indica se o cliente está bloqueado
    "accountingSchema": 1,                       // Tipo de contabilidade: 1 (acumulação) ou 2 (caixa)
    "oneTimeCustomer": false,                    // Indica se é um cliente ocasional
    "endCustomer": true,                         // Indica se é um cliente final
    "electronicMail": "cliente@teste.com",
    "telephone": "912345678",
    "streetName": "Rua Principal",
    "buildingNumber": "5",
    "cityName": "Lisboa",
    "postalZone": "1000-001",
    "country": "PT"                         // País
}
```
#### `GET getAllClients`

- **Descrição:** Obtém uma lista de todos os clientes.
- **Exemplo de URL:** `/client/getallclients`

#### `GET getClientByKey`

- **Descrição:** Obtém detalhes de um cliente específico através de uma chave única.
- **Exemplo de URL:** `/client/getclientbykey/{key}`
### **Materiais (Materials)**

#### `GET getAllMaterials`

- **Descrição:** Obtém uma lista de todos os materiais disponíveis.
- **Exemplo de URL:** `/materials/getallmaterials`

#### `GET getMaterialByKey`

- **Descrição:** Obtém detalhes de um material específico através de uma chave única.
- **Exemplo de URL:** `/materials/getmaterialbykey/{key}`
