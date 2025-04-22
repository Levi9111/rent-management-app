import { Types } from 'mongoose';

export interface TReceipt {
  receiptId: string;
  generatedReceiptDate: Date;
  rentMonth: string;
  rentAmountPaid: number;
  balanceDue: number;
  unitId: Types.ObjectId;
  tenantId: Types.ObjectId;
  paymentMethod: string;
  totalAmount: number;
}
