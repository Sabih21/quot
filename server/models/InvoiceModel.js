import mongoose from 'mongoose'

const InvoiceSchema = mongoose.Schema({
    dueDate: Date,
    currency: String,
    items: [ { 
        itemName: mongoose.Schema.Types.Mixed, 
        itemCode: String, 
        itemHsnCode: String, 
        itemMake: String, 
        quantity: String, 
        itemUnit: String, 
        unitPrice: String,
        discountPer: String, 
        discountAmo: String, 
        tax: mongoose.Schema.Types.Mixed, 
        taxAmo: String, 
        amount: String, 
    }],
    selectedCompany: {
        value: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
        label: { type: String, required: true }
    },
    rates: String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { name: String, email: String, phone: String, address: String },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const InvoiceModel = mongoose.model('InvoiceModel', InvoiceSchema)
export default InvoiceModel