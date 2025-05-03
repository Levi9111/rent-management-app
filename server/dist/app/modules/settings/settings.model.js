"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const mongoose_1 = require("mongoose");
const settingsSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        default: 'singleton',
    },
    ownerName: {
        type: String,
        required: true,
    },
    villaName: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    ownerSignatureUrl: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
    },
    branchName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    routingNumber: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.Settings = (0, mongoose_1.model)('Setting', settingsSchema);
//# sourceMappingURL=settings.model.js.map