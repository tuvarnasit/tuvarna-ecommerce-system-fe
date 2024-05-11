import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    title: 'Shop Page'
  },
  {
    path: 'product-details/:id',
    component: ProductDetailsComponent,
    title: 'Shop Details Page'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Shop Cart Page'
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'Shop Checkout Page'
  },
  {
    path: 'wishlist',
    component: WishlistComponent,
    title: 'Списък с желания'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
