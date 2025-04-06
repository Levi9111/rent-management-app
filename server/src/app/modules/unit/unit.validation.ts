import { z } from 'zod';

const createUnitValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    currentTenant: z.string().nullable().optional(),
    monthlyRent: z.number().min(0, 'Monthly Rent must be a positive number'),
    gasBill: z.number().min(0, 'Gas Bill must be a positive number'),
    waterBill: z.number().min(0, 'Water Bill must be a positive number'),
    others: z.number().min(0, 'Others must be a positive number'),
  }),
});

export const UnitValidations = {
  createUnitValidationSchema,
};
