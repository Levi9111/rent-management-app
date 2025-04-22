"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptUtils = void 0;
const receipt_model_1 = require("./receipt.model");
const generateReceiptNumber = async () => {
    const lastReceipt = await receipt_model_1.Receipt.findOne().sort({ createdAt: -1 });
    let newNumber = 1;
    if (lastReceipt && lastReceipt.receiptId) {
        const refinedNumericPart = parseInt(String(lastReceipt.receiptId).replace('#', ''));
        newNumber = refinedNumericPart + 1;
    }
    const padded = String(newNumber).padStart(5, '0');
    return `#${padded}`;
};
exports.ReceiptUtils = {
    generateReceiptNumber,
};
//# sourceMappingURL=receipt.utils.js.map