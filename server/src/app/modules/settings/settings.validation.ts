import { z } from 'zod';

// Example phone regex for international/local formats (adjust as needed)
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;

// Example numeric regex for account and routing numbers (digits only)
const numericRegex = /^\d+$/;

const settingsValidationSchema = z.object({
  body: z.object({
    settings: z.object({
      ownerName: z.string().optional(),
      villaName: z.string().optional(),
      streetAddress: z.string().optional(),
      phoneNumber: z
        .string()
        .regex(phoneRegex, 'Invalid phone number format')
        .optional(),

      bankName: z.string().optional(),
      branchName: z.string().optional(),

      accountNumber: z
        .string()
        .regex(numericRegex, 'Account number must be numeric')
        .optional(),

      routingNumber: z
        .string()
        .regex(numericRegex, 'Routing number must be numeric')
        .optional(),
    }),
  }),
});

export const SettingsValidation = {
  settingsValidationSchema,
};
