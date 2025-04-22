"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tenant = void 0;
// models/tenant.model.ts
const mongoose_1 = require("mongoose");
const tenantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rentStartDate: {
        type: Date,
        required: true,
    },
    rentEndDate: {
        type: Date,
        default: null,
    },
    rentedUnit: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Unit',
    },
    advancedAmount: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['current', 'former'],
        default: 'current',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Tenant = (0, mongoose_1.model)('Tenant', tenantSchema);
//# sourceMappingURL=tenant.model.js.map