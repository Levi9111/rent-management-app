export interface TTenant {
  name: string;
  phoneNumber: string;
  email: string;
  rentStartDate: Date;
  rentEndDate: Date | null;
  status: 'current' | 'former';
}
