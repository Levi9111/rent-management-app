export interface Tenant {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  rentStartDate: string;
  rentEndDate?: string;
  advancedAmount: number;
  status: string;
  rentedUnit?: Unit;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export interface Unit {
  _id: string;
  name: string;
  monthlyRent: number;
  gasBill: number;
  waterBill: number;
  others: number;
  occupied: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BasicInfo {
  _id: string;
  ownerName: string;
  villaName: string;
  streetAddress: string;
  phoneNumber: string;
  ownerSignatureUrl: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  routingNumber: string;
}

export interface ReceiptData {
  _id: string;
  receiptId: string;
  generatedReceiptDate: string;
  rentMonth: string;
  rentAmountPaid: number;
  balanceDue: number;
  unitId: Unit;
  tenantId: Tenant;
  paymentMethod: string;
  totalAmount: number;
}
