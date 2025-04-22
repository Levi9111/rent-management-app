import { Schema, model } from 'mongoose';
import { TReceipt } from './receipt.interface';

const receiptSchema = new Schema<TReceipt>(
  {
    receiptId: {
      type: String,
      required: true,
      unique: true,
    },
    generatedReceiptDate: {
      type: Date,
      required: true,
    },
    rentMonth: {
      type: String,
      required: true,
    },
    rentAmountPaid: {
      type: Number,
      required: true,
    },
    balanceDue: {
      type: Number,
      required: true,
    },
    unitId: {
      type: Schema.Types.ObjectId,
      ref: 'Unit',
      required: true,
    },
    tenantId: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export const Receipt = model<TReceipt>('Receipt', receiptSchema);
