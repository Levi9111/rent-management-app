"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValidation = void 0;
const zod_1 = require("zod");
// Example phone regex for international/local formats (adjust as needed)
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
// Example numeric regex for account and routing numbers (digits only)
const numericRegex = /^\d+$/;
const settingsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        settings: zod_1.z.object({
            ownerName: zod_1.z.string().optional(),
            villaName: zod_1.z.string().optional(),
            streetAddress: zod_1.z.string().optional(),
            phoneNumber: zod_1.z
                .string()
                .regex(phoneRegex, 'Invalid phone number format')
                .optional(),
            bankName: zod_1.z.string().optional(),
            branchName: zod_1.z.string().optional(),
            accountNumber: zod_1.z
                .string()
                .regex(numericRegex, 'Account number must be numeric')
                .optional(),
            routingNumber: zod_1.z
                .string()
                .regex(numericRegex, 'Routing number must be numeric')
                .optional(),
        }),
    }),
});
exports.SettingsValidation = {
    settingsValidationSchema,
};
//# sourceMappingURL=settings.validation.js.map