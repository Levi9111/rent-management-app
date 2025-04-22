import { Receipt } from './receipt.model';

const generateReceiptNumber = async (): Promise<string> => {
  const lastReceipt = await Receipt.findOne().sort({ createdAt: -1 });

  let newNumber = 1;

  if (lastReceipt && lastReceipt.receiptId) {
    const refinedNumericPart = parseInt(
      String(lastReceipt.receiptId).replace('#', ''),
    );
    newNumber = refinedNumericPart + 1;
  }

  const padded = String(newNumber).padStart(5, '0');
  return `#${padded}`;
};

export const ReceiptUtils = {
  generateReceiptNumber,
};
