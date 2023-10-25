export interface Booking {
  'Class ID': Array<string> | null | undefined;
  'Instructor Username': Array<string> | null | undefined;
  'Payment Status': string | null | undefined;
  Currency: string | null | undefined;
  Amount: number | null | undefined;
  'Class Date & Time': string | null | undefined;
  'Stripe Date': string | null | undefined;
  'Stripe ID': string | null | undefined;
  'Customer Email': string | null | undefined;
}
