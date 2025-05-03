import { Schema, model } from 'mongoose';
import { TSettings } from './settings.interface';

const settingsSchema = new Schema<TSettings>(
  {
    _id: {
      type: String,
      default: 'singleton',
    },
    ownerName: {
      type: String,
      required: true,
    },
    villaName: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    ownerSignatureUrl: {
      type: String,
      required: true,
    },

    bankName: {
      type: String,
    },
    branchName: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    routingNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Settings = model<TSettings>('Setting', settingsSchema);
