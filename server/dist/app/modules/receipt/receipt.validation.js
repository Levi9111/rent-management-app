"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptValidation = void 0;
const zod_1 = require("zod");
const createReceiptValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        receipt: zod_1.z.object({
            tenantId: zod_1.z.string({ required_error: 'Tenant ID is required' }),
            rentAmountPaid: zod_1.z
                .number({ required_error: 'Rent paid amound is required' })
                .min(0),
            paymentMethod: zod_1.z.string({ required_error: 'Payment method is required' }),
        }),
    }),
});
exports.ReceiptValidation = {
    createReceiptValidationSchema,
};
//# sourceMappingURL=receipt.validation.js.map