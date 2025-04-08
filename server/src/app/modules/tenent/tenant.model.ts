// models/tenant.model.ts
import { Schema, model } from 'mongoose';
import { TTenant } from './tenant.interface';

const tenantSchema = new Schema<TTenant>(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rentStartDate: {
      type: Date,
      required: true,
    },
    rentEndDate: {
      type: Date,
      default: null,
    },
    rentedUnit: {
      type: Schema.Types.ObjectId,
      ref: 'Unit',
    },
    advancedAmount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['current', 'former'],
      default: 'current',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Tenant = model<TTenant>('Tenant', tenantSchema);
