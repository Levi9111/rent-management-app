import { Types } from 'mongoose';

export interface TTenant {
  name: string;
  phoneNumber: string;
  email: string;
  rentStartDate: Date;
  rentEndDate: Date | null;
  rentedUnit: Types.ObjectId;
  advancedAmount: number;
  status: 'current' | 'former';
}
