import { Types } from 'mongoose';

export interface TUnit {
  name: string;
  currentTenant: Types.ObjectId | null;
  monthlyRent: number;
  gasBill: number;
  waterBill: number;
  others: number;
}
