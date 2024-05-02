import { CartService } from '@/shared/services/cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  couponCode: string = '';
  shipCost: number = 0;
  discountPercent: number = 0;
  freeShippingReached: boolean = false;

  constructor(public cartService: CartService) { }

  handleCouponSubmit() {
    if (this.couponCode === 'TUVARNA15') {
      this.discountPercent = 15;
    } else {
      this.discountPercent = 0;
    }
    this.couponCode = '';
  }

  handleShippingCost(value: number | string) {
    if (value === 'free') {
      this.shipCost = 0;
    } else {
      this.shipCost = value as number;
    }
  }

  getTotalPrice(): number {
    const subtotal = this.cartService.totalPriceQuantity().total;
    const discount = this.discountPercent / 100 * subtotal;
    if (subtotal - discount > 100) {
      this.freeShippingReached = true;
      this.shipCost = 0;
    } else {
      this.freeShippingReached = false;
    }
    if (this.freeShippingReached) {
      return subtotal - discount;
    }
    return subtotal - discount + this.shipCost;
  }
}
