export interface IProductInventory {
  id: number;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  importDate: Date;
}