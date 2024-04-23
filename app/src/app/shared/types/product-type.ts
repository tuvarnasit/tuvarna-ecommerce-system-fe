import { ICategory } from "./category-type";
import { IProductImage } from "./product-image-type";
import { IProductInventory } from "./product-inventory-type";
import { ISaleItem } from "./sale-item-type";
import { ITag } from "./tag-type";

export interface IProduct {
  id: number;
  name: string;
  sku: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  productType: string;
  category?: ICategory;
  tags: ITag[];
  images: IProductImage[];
  inventories: IProductInventory[];
  sales: ISaleItem[];
}
