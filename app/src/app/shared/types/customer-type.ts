import { ISale } from "./sale-type";

export interface ICustomer {
  id: number;
  username: string;
  email: string;
  role: string;
  sales: ISale[];
}
