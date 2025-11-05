const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/database');

const Invoice = sequelize.define('Invoice', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  invoiceNumber: { type: DataTypes.STRING, allowNull: false, unique: true, field: 'invoice_number' },
  userId: { type: DataTypes.UUID, allowNull: false, field: 'user_id', references: { model: 'users', key: 'id' }, onDelete: 'CASCADE' },
  paymentId: { type: DataTypes.UUID, allowNull: false, field: 'payment_id', references: { model: 'payments', key: 'id' }, onDelete: 'CASCADE' },
  courseId: { type: DataTypes.UUID, allowNull: false, field: 'course_id', references: { model: 'courses', key: 'id' }, onDelete: 'CASCADE' },
  amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  currency: { type: DataTypes.STRING, defaultValue: 'RWF' },
  tax: { type: DataTypes.JSONB, defaultValue: { amount: 0, percentage: 0, taxId: null } },
  discount: { type: DataTypes.JSONB, defaultValue: { amount: 0, couponCode: null } },
  subtotal: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  total: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.ENUM('draft','issued','paid','cancelled','refunded'), defaultValue: 'issued' },
  issuedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, field: 'issued_date' },
  dueDate: { type: DataTypes.DATE, field: 'due_date' },
  paidDate: { type: DataTypes.DATE, field: 'paid_date' },
  billingInfo: { type: DataTypes.JSONB, defaultValue: {}, field: 'billing_info' },
  pdfUrl: { type: DataTypes.STRING, field: 'pdf_url' },
  notes: { type: DataTypes.STRING },
  emailSent: { type: DataTypes.BOOLEAN, defaultValue: false, field: 'email_sent' },
  emailSentAt: { type: DataTypes.DATE, field: 'email_sent_at' }
}, {
  timestamps: true,
  tableName: 'invoices',
  underscored: true,
  indexes: [
    { unique: true, fields: ['invoice_number'] },
    { fields: ['user_id'] },
    { fields: ['payment_id'] },
    { fields: ['status'] },
    { fields: ['issued_date'] }
  ]
});

Invoice.prototype.toPublic = function() {
  return {
    invoiceNumber: this.invoiceNumber,
    amount: this.amount,
    currency: this.currency,
    subtotal: this.subtotal,
    total: this.total,
    status: this.status,
    issuedDate: this.issuedDate,
    dueDate: this.dueDate,
    paidDate: this.paidDate,
    billingInfo: this.billingInfo,
    pdfUrl: this.pdfUrl,
  };
};

module.exports = Invoice;
