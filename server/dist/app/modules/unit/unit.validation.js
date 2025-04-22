"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitValidations = void 0;
const zod_1 = require("zod");
const createUnitValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        unit: zod_1.z.object({
            name: zod_1.z.string().min(1, 'Name is required'),
            monthlyRent: zod_1.z.string().refine((value) => !isNaN(Number(value)), {
                message: 'Monthly Rent must be a number',
            }),
            gasBill: zod_1.z.string().refine((value) => !isNaN(Number(value)), {
                message: 'Gas Bill must be a number',
            }),
            waterBill: zod_1.z.string().refine((value) => !isNaN(Number(value)), {
                message: 'Water Bill must be a number',
            }),
            others: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Others must be a number',
            })
                .optional(),
        }),
    }),
});
const updateUnitValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        unit: zod_1.z.object({
            name: zod_1.z.string().optional(),
            monthlyRent: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Monthly Rent must be a number',
            })
                .optional(),
            gasBill: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Gas Bill must be a number',
            })
                .optional(),
            waterBill: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Water Bill must be a number',
            })
                .optional(),
            others: zod_1.z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                message: 'Others must be a number',
            })
                .optional(),
        }),
    }),
});
exports.UnitValidations = {
    createUnitValidationSchema,
    updateUnitValidationSchema,
};
//# sourceMappingURL=unit.validation.js.map