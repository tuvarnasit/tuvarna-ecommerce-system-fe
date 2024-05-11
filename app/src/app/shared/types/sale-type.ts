import { ISaleItem } from "./sale-item-type";

export interface ISale {
  id: number;
  date: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  town: string;
  state: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  discountPercentage?: number;
  paymentType: string;
  shippingType: string;
  orderNotes?: string;
  items: ISaleItem[];
}