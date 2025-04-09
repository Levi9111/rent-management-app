export interface TUnit {
  name: string;
  monthlyRent: number;
  gasBill: number;
  waterBill: number;
  others: number;
  occupied: boolean;
  [key: string]: unknown;
}
