const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Invoice = require('./models/Invoice');
const InvoiceLine = require('./models/InvoiceLine');
const Payment = require('./models/Payment');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fixwala';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const seedInvoices = async () => {
  try {
    // Clear existing invoice data
    await Payment.deleteMany({});
    await InvoiceLine.deleteMany({});
    await Invoice.deleteMany({});

    console.log('Cleared existing invoice data');

    // Create Invoice 1
    const invoice1 = new Invoice({
      invoiceNumber: 'INV-2024-001',
      customerName: 'John Smith',
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      status: 'DRAFT',
      total: 850.00,
      amountPaid: 350.00,
      balanceDue: 500.00
    });
    await invoice1.save();

    // Create line items for Invoice 1
    const line1_1 = new InvoiceLine({
      invoiceId: invoice1._id,
      description: 'AC Repair Service',
      quantity: 1,
      unitPrice: 350.00,
      lineTotal: 350.00
    });
    await line1_1.save();

    const line1_2 = new InvoiceLine({
      invoiceId: invoice1._id,
      description: 'Electrical Wiring Inspection',
      quantity: 2,
      unitPrice: 150.00,
      lineTotal: 300.00
    });
    await line1_2.save();

    const line1_3 = new InvoiceLine({
      invoiceId: invoice1._id,
      description: 'Replacement Parts',
      quantity: 1,
      unitPrice: 200.00,
      lineTotal: 200.00
    });
    await line1_3.save();

    // Create payment for Invoice 1
    const payment1 = new Payment({
      invoiceId: invoice1._id,
      amount: 350.00,
      paymentDate: new Date('2024-01-20')
    });
    await payment1.save();

    console.log('Invoice 1 created with line items and payment');

    // Create Invoice 2 (Fully paid)
    const invoice2 = new Invoice({
      invoiceNumber: 'INV-2024-002',
      customerName: 'Sarah Johnson',
      issueDate: new Date('2024-01-10'),
      dueDate: new Date('2024-02-10'),
      status: 'PAID',
      total: 1200.00,
      amountPaid: 1200.00,
      balanceDue: 0.00
    });
    await invoice2.save();

    // Create line items for Invoice 2
    const line2_1 = new InvoiceLine({
      invoiceId: invoice2._id,
      description: 'Plumbing System Overhaul',
      quantity: 1,
      unitPrice: 800.00,
      lineTotal: 800.00
    });
    await line2_1.save();

    const line2_2 = new InvoiceLine({
      invoiceId: invoice2._id,
      description: 'Water Heater Installation',
      quantity: 1,
      unitPrice: 400.00,
      lineTotal: 400.00
    });
    await line2_2.save();

    // Create payments for Invoice 2
    const payment2_1 = new Payment({
      invoiceId: invoice2._id,
      amount: 600.00,
      paymentDate: new Date('2024-01-12')
    });
    await payment2_1.save();

    const payment2_2 = new Payment({
      invoiceId: invoice2._id,
      amount: 600.00,
      paymentDate: new Date('2024-01-25')
    });
    await payment2_2.save();

    console.log('Invoice 2 created with line items and payments (PAID)');

    // Create Invoice 3 (Draft, no payments)
    const invoice3 = new Invoice({
      invoiceNumber: 'INV-2024-003',
      customerName: 'Michael Brown',
      issueDate: new Date('2024-02-01'),
      dueDate: new Date('2024-03-01'),
      status: 'DRAFT',
      total: 550.00,
      amountPaid: 0.00,
      balanceDue: 550.00
    });
    await invoice3.save();

    // Create line items for Invoice 3
    const line3_1 = new InvoiceLine({
      invoiceId: invoice3._id,
      description: 'Appliance Repair - Washing Machine',
      quantity: 1,
      unitPrice: 250.00,
      lineTotal: 250.00
    });
    await line3_1.save();

    const line3_2 = new InvoiceLine({
      invoiceId: invoice3._id,
      description: 'Maintenance Check',
      quantity: 3,
      unitPrice: 100.00,
      lineTotal: 300.00
    });
    await line3_2.save();

    console.log('Invoice 3 created with line items (no payments)');

    console.log('\nSeeding completed successfully!');
    console.log(`Invoice 1 ID: ${invoice1._id}`);
    console.log(`Invoice 2 ID: ${invoice2._id}`);
    console.log(`Invoice 3 ID: ${invoice3._id}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding invoices:', error);
    process.exit(1);
  }
};

seedInvoices();
