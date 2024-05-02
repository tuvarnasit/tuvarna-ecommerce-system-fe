import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartComponent } from './pages/cart/cart.component';

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
    title: 'Shop cart Page'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
