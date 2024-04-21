import { Injectable } from '@angular/core';
import { IProduct } from '@/types/product-type';

const state = {
  cart_products: JSON.parse(localStorage['cart_products'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public orderQuantity: number = 1;
  public isCartOpen: boolean = false;

  constructor() { }

  public getCartProducts(): IProduct[] {
    return state.cart_products;
  }

  handleOpenCartSidebar () {
    this.isCartOpen = !this.isCartOpen
  }
}
