import { z } from 'zod';

const createReceiptValidationSchema = z.object({
  body: z.object({
    receipt: z.object({
      tenantId: z.string({ required_error: 'Tenant ID is required' }),
      rentAmountPaid: z
        .number({ required_error: 'Rent paid amound is required' })
        .min(0),
      paymentMethod: z.string({ required_error: 'Payment method is required' }),
    }),
  }),
});

export const ReceiptValidation = {
  createReceiptValidationSchema,
};
