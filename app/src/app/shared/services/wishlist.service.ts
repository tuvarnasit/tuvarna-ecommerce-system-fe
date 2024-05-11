import { IProduct } from '@/types/product-type';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const state = {
  wishlists: JSON.parse(localStorage['wishlist_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private toastrService: ToastrService) { }

  public getWishlistProducts() {
    return state.wishlists;
  }

  add_wishlist_product(payload: IProduct) {
    const isAdded = state.wishlists.findIndex((p: IProduct) => p.id === payload.id);
    if (isAdded !== -1) {
      state.wishlists = state.wishlists.filter((p: IProduct) => p.id !== payload.id);
      this.toastrService.error(`${payload.name} е премахнат от списъка с желания.`);
    } else {
      state.wishlists.push(payload);
      this.toastrService.success(`${payload.name} добавен към списъка с желания.`);
    }
    localStorage.setItem("wishlist_products", JSON.stringify(state.wishlists));
  };

  removeWishlist(payload: IProduct) {
    state.wishlists = state.wishlists.filter((p: IProduct) => p.id !== payload.id);
    this.toastrService.error(`${payload.name} е премахнат от списъка с желания.`);
    localStorage.setItem("wishlist_products", JSON.stringify(state.wishlists));
  };

  public getPriceForProductAsNumber(product: IProduct): number {
    const availableInventory = product.inventories?.find(inv => inv.stockQuantity > 0);
    if (availableInventory) {
      return availableInventory.discountPrice ?? availableInventory.price;
    }
    return 0;
  }
}
