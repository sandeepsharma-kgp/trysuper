const express = require('express');
const InvoiceService = require('../services/invoice');

const router = express.Router();
const invoiceService = new InvoiceService();

// POST /invoices
router.post('/', async (req, res) => {
  try {
    const invoiceData = req.body;
    const createdInvoice = await invoiceService.createInvoice(invoiceData);
    res.status(201).json({ message: 'Invoice created successfully', invoice: createdInvoice });
  } catch (error) {
    
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// GET /invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
  } catch (error) {
    console.error('Error retrieving invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET /invoices/:id
router.get('/:id', async (req, res) => {
  try {
    const invoiceid = req.params.id;
    const invoice = await invoiceService.getInvoiceById(invoiceid);

    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.json(invoice);
    }
  } catch (error) {
    console.error('Error retrieving invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
