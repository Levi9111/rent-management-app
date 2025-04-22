"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const mongoose_1 = require("mongoose");
const receiptSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Unit',
        required: true,
    },
    tenantId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
exports.Receipt = (0, mongoose_1.model)('Receipt', receiptSchema);
//# sourceMappingURL=receipt.model.js.map