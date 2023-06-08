const express = require('express');
const invoiceController = require('./contollers/invoice');

const app = express();
app.use(express.json());

app.use('/invoices', invoiceController);

const port = 3000; // You can use any available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
