"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TenantValidations = void 0;
const zod_1 = require("zod");
const createTenantValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        tenant: zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required'),
            phoneNumber: zod_1.z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
                message: 'Invalid phone number',
            }),
            email: zod_1.z.string().email(),
            rentStartDate: zod_1.z.string().refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }),
            rentEndDate: zod_1.z
                .string()
                .nullable()
                .optional()
                .refine((date) => !date || !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            }),
            rentedUnit: zod_1.z.string(),
            advancedAmount: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Advanced amount must be a number',
            })
                .transform((value) => Number(value)),
            status: zod_1.z.enum(['current', 'former']).optional(),
        }),
    }),
});
const updateTenantValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        tenant: zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required').optional(),
            phoneNumber: zod_1.z
                .preprocess((val) => String(val), zod_1.z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
                message: 'Invalid phone number',
            }))
                .optional(),
            email: zod_1.z.string().email().optional(),
            rentStartDate: zod_1.z
                .string()
                .refine((date) => !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            })
                .optional(),
            rentEndDate: zod_1.z
                .string()
                .nullable()
                .optional()
                .refine((date) => !date || !isNaN(Date.parse(date)), {
                message: 'Invalid date format',
            })
                .optional(),
            advancedAmount: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Advanced amount must be a number',
            })
                .transform((value) => Number(value)),
            status: zod_1.z.enum(['current', 'former']).optional(),
        }),
    }),
});
exports.TenantValidations = {
    createTenantValidationSchema,
    updateTenantValidationSchema,
};
//# sourceMappingURL=tenant.validation.js.map