import { z } from 'zod';

const createUnitValidationSchema = z.object({
  body: z.object({
    unit: z.object({
      name: z.string().min(1, 'Name is required'),
      monthlyRent: z.string().refine((value) => !isNaN(Number(value)), {
        message: 'Monthly Rent must be a number',
      }),
      gasBill: z.string().refine((value) => !isNaN(Number(value)), {
        message: 'Gas Bill must be a number',
      }),
      waterBill: z.string().refine((value) => !isNaN(Number(value)), {
        message: 'Water Bill must be a number',
      }),
      others: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Others must be a number',
        })
        .optional(),
    }),
  }),
});

const updateUnitValidationSchema = z.object({
  body: z.object({
    unit: z.object({
      name: z.string().optional(),
      monthlyRent: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Monthly Rent must be a number',
        })
        .optional(),
      gasBill: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Gas Bill must be a number',
        })
        .optional(),
      waterBill: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Water Bill must be a number',
        })
        .optional(),

      others: z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: 'Others must be a number',
        })
        .optional(),
    }),
  }),
});

export const UnitValidations = {
  createUnitValidationSchema,
  updateUnitValidationSchema,
};
