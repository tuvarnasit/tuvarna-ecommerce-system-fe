import { IProduct } from "./product-type";

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  products: IProduct[];
}
