const { Invoice, Item } = require('../models/models');

class InvoiceRepository {
  async createInvoice(invoiceData) {
    try {
      const { items, ...invoice } = invoiceData;

      const createdInvoice = await Invoice.create(invoice);

      if (items && items.length > 0) {
        const createdItems = await Promise.all(
          items.map((item) => Item.create({ ...item, invoiceid: createdInvoice.id }))
        );

        createdInvoice.setItems(createdItems);
      }

      return createdInvoice;
    } catch (error) {
      throw new Error('Error creating invoice');
    }
  }

  async getInvoiceById(id) {
    try {
      const invoice = await Invoice.findByPk(id, { include: 'items' });
      return invoice;
    } catch (error) {
      throw new Error('Error retrieving invoice');
    }
  }

  async getAllInvoices() {
    try {
      const invoices = await Invoice.findAll({ include: 'items' });
      return invoices;
    } catch (error) {
      throw new Error('Error retrieving invoices');
    }
  }
}

module.exports = InvoiceRepository;
