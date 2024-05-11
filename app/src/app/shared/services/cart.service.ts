import { Injectable } from '@angular/core';
import { IProduct } from '@/types/product-type';
import { ToastrService } from 'ngx-toastr';

const state = {
  cart_products: JSON.parse(localStorage['cart_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public orderQuantity: number = 1;
  public isCartOpen: boolean = false;

  constructor(private toastrService: ToastrService) { }

  public getCartProducts(): IProduct[] {
    return state.cart_products;
  }

  handleOpenCartSidebar() {
    this.isCartOpen = !this.isCartOpen
  }

  addCartProduct(payload: IProduct) {

    const totalStock = payload.inventories.reduce((sum, inventory) => sum + inventory.stockQuantity, 0);
    const isExist = state.cart_products.find((i: IProduct) => i.id === payload.id);

    if (totalStock === 0) {
      this.toastrService.error(`Out of stock ${payload.name}`);
    }
    else if (!isExist) {
      const newItem = {
        ...payload,
        orderQuantity: 1,
      };
      state.cart_products.push(newItem);
      this.toastrService.success(`${payload.name} е добавен в количката.`);
    } else {
      state.cart_products.map((item: IProduct) => {
        if (item.id === payload.id) {
          if (typeof item.orderQuantity !== "undefined") {
            console.log(totalStock)
            if (totalStock >= item.orderQuantity + this.orderQuantity) {
              item.orderQuantity =
                this.orderQuantity !== 1
                  ? this.orderQuantity + item.orderQuantity
                  : item.orderQuantity + 1;
              this.toastrService.success(`${this.orderQuantity} ${item.name} е добавен в количката.`);
            } else {
              this.toastrService.error(`Няма повече наличност от този продукт!`);
              this.orderQuantity = 1;
            }
          }
        }
        return { ...item };
      });
    }
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  public totalPriceQuantity() {
    return state.cart_products.reduce(
      (cartTotal: { total: number; quantity: number }, product: IProduct) => {
        const orderQuantity = product.orderQuantity ?? 0;
        let quantityLeft = orderQuantity;
        let totalForProduct = 0;

        // Sort inventories by import date to use the freshest inventory first
        const sortedInventories = (product.inventories || []).sort((a, b) =>
          new Date(b.importDate).getTime() - new Date(a.importDate).getTime()
        );

        for (let inventory of sortedInventories) {
          if (quantityLeft <= 0) break;
          if (inventory.stockQuantity > 0) {
            const useQuantity = Math.min(inventory.stockQuantity, quantityLeft);
            const price = inventory.discountPrice ?? inventory.price;
            totalForProduct += price * useQuantity;
            quantityLeft -= useQuantity;
          }
        }

        if (quantityLeft > 0) {
          this.toastrService.warning(`Няма достатъчно бройки ${product.name}, липсват ${quantityLeft} броя.`);
        }

        cartTotal.total += totalForProduct;
        cartTotal.quantity += (orderQuantity - quantityLeft);

        return cartTotal;
      },
      { total: 0, quantity: 0 }
    );
  };

  decrement() {
    return this.orderQuantity =
      this.orderQuantity > 1
        ? this.orderQuantity - 1
        : this.orderQuantity = 1;
  }

  increment() {
    return this.orderQuantity = this.orderQuantity + 1;
  }

  quantityDecrement(payload: IProduct) {
    state.cart_products.map((item: IProduct) => {
      if (item.id === payload.id) {
        if (typeof item.orderQuantity !== "undefined") {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
            this.toastrService.info(`Количеството на ${item.name} е намалено.`);
          }
        }
      }
      return { ...item };
    });
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  removeCartProduct(payload: IProduct) {
    state.cart_products = state.cart_products.filter(
      (p: IProduct) => p.id !== payload.id
    );
    this.toastrService.error(`${payload.name} remove to cart`);
    localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
  };

  clear_cart(askConfirmation: boolean = true): void {
    
    let proceed = true;
  
    if (askConfirmation) {
      // Only ask for confirmation if askConfirmation is true
      proceed = window.confirm("Are you sure you want to delete all your cart items?");
    }
  
    if (proceed) {
      state.cart_products = [];
      localStorage.setItem("cart_products", JSON.stringify(state.cart_products));
    }
  }

  initialOrderQuantity() {
    return this.orderQuantity = 1;
  };

  public getPriceForProduct(product: IProduct): { price: number, discountPrice: number } {
    const availableInventory = product.inventories?.find(inv => inv.stockQuantity > 0);
    if (availableInventory) {
      return {
        price: availableInventory.price,
        discountPrice: availableInventory.discountPrice || availableInventory.price
      };
    }
    return { price: 0, discountPrice: 0 };
  }

  public getPriceForProductAsNumber(product: IProduct): number {
    const availableInventory = product.inventories?.find(inv => inv.stockQuantity > 0);
    if (availableInventory) {
      return availableInventory.discountPrice ?? availableInventory.price;
    }
    return 0;
  }
}
