import { CartService } from '@/shared/services/cart.service';
import { UtilsService } from '@/shared/services/utils.service';
import { IProductInventory } from '@/types/product-inventory-type';
import { IProduct } from '@/types/product-type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product!: IProduct;
  @Input() offer_style: Boolean | undefined;

  constructor(
    public utilsService: UtilsService,
    private cartService: CartService
  ) { }

  addToCart(product: IProduct) {
    this.cartService.addCartProduct(product);
  }

  isItemInCart(item: IProduct): boolean {
    return false
    //return this.cartService.getCartProducts().some((prd: IProduct) => prd.id === item.id);
  }

  productStatus(product: IProduct): boolean {

    if (!product.inventories || product.inventories.length === 0) {
      return true;
    }

    const totalStock = product.inventories.reduce((acc, inventory) => acc + inventory.stockQuantity, 0);

    return totalStock === 0;
  }

  getFirstAvailableInventory(product: IProduct): IProductInventory | undefined {
    const availableInventory = product.inventories?.find(inventory => inventory.stockQuantity > 0);
    return availableInventory ? availableInventory : this.getLatestInventory(product);
  }

  getLatestInventory(product: IProduct): IProductInventory | undefined {
    
    if (!product.inventories || product.inventories.length === 0) {
      return undefined;
    }
    return product.inventories.reduce((latest, current) => {
      return (!latest || new Date(current.importDate) > new Date(latest.importDate)) ? current : latest;
    });
  }

  capitalizeFirstLetter(inputString: string): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }
}
