const { Invoice, Item } = require('../models/models');

class InvoiceRepository {
  // ...

  async createInvoice(invoiceData) {
    try {
      const { items, ...invoice } = invoiceData;

      const createdInvoice = await Invoice.create(invoice);
      console.log(createdInvoice)
      console.log(items)
      if (items && items.length > 0) {
        const createdItems = await Promise.all(
          items.map((item) => Item.create({ ...item, invoiceid: createdInvoice.id }))
        );

        await createdInvoice.addItems(createdItems);
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
      const invoices = await this.invoiceRepository.getAllInvoices();
      return invoices;
    } catch (error) {
      throw new Error('Error retrieving invoices');
    }
  }
}

module.exports = InvoiceRepository;
