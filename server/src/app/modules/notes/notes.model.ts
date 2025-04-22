import { model, Schema } from 'mongoose';
import { TNote } from './notes.interface';

const notesSchema = new Schema<TNote>(
  {
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Notes = model<TNote>('Notes', notesSchema);
