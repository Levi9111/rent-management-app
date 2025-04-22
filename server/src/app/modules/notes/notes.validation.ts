import { z } from 'zod';

const createNoteValidationSchema = z.object({
  body: z.object({
    note: z.object({
      text: z.string().min(1, 'Note text is required'),
    }),
  }),
});

const updateNoteValidationSchema = z.object({
  body: z.object({
    note: z.object({
      text: z.string().optional(),
    }),
  }),
});

export const NotesValidations = {
  createNoteValidationSchema,
  updateNoteValidationSchema,
};
