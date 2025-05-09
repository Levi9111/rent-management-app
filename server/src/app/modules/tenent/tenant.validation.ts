import { z } from 'zod';

const createTenantValidationSchema = z.object({
  body: z.object({
    tenant: z.object({
      name: z.string().min(1, 'Name is required'),
      phoneNumber: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
        message: 'Invalid phone number',
      }),
      email: z.string().email(),
      rentStartDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      }),
      rentEndDate: z
        .string()
        .nullable()
        .optional()
        .refine((date) => !date || !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        }),
      rentedUnit: z.string(),
      advancedAmount: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Advanced amount must be a number',
        })
        .transform((value) => Number(value)),

      status: z.enum(['current', 'former']).optional(),
    }),
  }),
});

const updateTenantValidationSchema = z.object({
  body: z.object({
    tenant: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      phoneNumber: z
        .preprocess(
          (val) => String(val),
          z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
            message: 'Invalid phone number',
          }),
        )
        .optional(),
      email: z.string().email().optional(),
      rentStartDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        })
        .optional(),
      rentEndDate: z
        .string()
        .nullable()
        .optional()
        .refine((date) => !date || !isNaN(Date.parse(date)), {
          message: 'Invalid date format',
        })
        .optional(),
      advancedAmount: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Advanced amount must be a number',
        })
        .transform((value) => Number(value)),

      status: z.enum(['current', 'former']).optional(),
    }),
  }),
});

export const TenantValidations = {
  createTenantValidationSchema,
  updateTenantValidationSchema,
};
