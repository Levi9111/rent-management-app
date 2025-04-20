import { z } from 'zod';

// const phoneRegex = /^(?:\+?88)?01[3-9]\d{8}$/;

const settingsValidationSchema = z.object({
  body: z.object({
    settings: z.object({
      ownerName: z.string().optional(),
      villaName: z.string().optional(),
      streetAddress: z.string().optional(),
      // phoneNumber: z
      //   .string()
      //   .regex(phoneRegex, 'Invalid phone number format')
      //   .optional(),
      phoneNumber: z.string().optional(),
    }),
  }),
});

export const SettingsValidation = {
  settingsValidationSchema,
};
