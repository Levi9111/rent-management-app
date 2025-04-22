"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const unitSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    monthlyRent: {
        type: Number,
        required: true,
    },
    gasBill: {
        type: Number,
        required: true,
    },
    waterBill: {
        type: Number,
        required: true,
    },
    others: {
        type: Number,
        default: 0,
        required: true,
    },
    occupied: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const Unit = (0, mongoose_1.model)('Unit', unitSchema);
exports.default = Unit;
// mongodb+srv://rent-management:11223344@cluster0.u9ne8wd.mongodb.net/rent-management-app?retryWrites=true&w=majority&appName=Cluster0
// rent-management
// 11223344
//# sourceMappingURL=unit.model.js.map