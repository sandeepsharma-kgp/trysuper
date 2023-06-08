const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'sandeepsharma', '', {
  host: 'localhost',
  dialect: 'postgres',
});

const Invoice = sequelize.define('invoices', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  customerid: {
    type: DataTypes.STRING,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  duedate: {
    type: DataTypes.DATEONLY,
  },
}, {
  timestamps: false, // Disable automatic timestamps
});

const Item = sequelize.define('items', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
  },
  cost: {
    type: DataTypes.FLOAT,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false, // Disable automatic timestamps
});

// Define the association between Invoice and Item
Invoice.hasMany(Item, { as: 'items' });
Item.belongsTo(Invoice);

module.exports = { Invoice, Item };
