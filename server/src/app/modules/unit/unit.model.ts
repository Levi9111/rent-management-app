import { Schema, model } from 'mongoose';
import { TUnit } from './unit.interface';

const unitSchema = new Schema<TUnit>(
  {
    name: {
      type: String,
      required: true,
    },
    currentTenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      default: null,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    gasBill: {
      type: Number,
      required: true,
    },
    waterBill: {
      type: Number,
      required: true,
    },
    others: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Unit = model<TUnit>('Unit', unitSchema);

export default Unit;

// mongodb+srv://rent-management:11223344@cluster0.u9ne8wd.mongodb.net/rent-management-app?retryWrites=true&w=majority&appName=Cluster0

// rent-management
// 11223344
