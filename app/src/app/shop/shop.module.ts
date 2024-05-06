import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SharedModule } from '@/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductItemLargeComponent } from './product-item-large/product-item-large.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopAreaComponent } from './shop-area/shop-area.component';
import { PriceFilterComponent } from './filtering/price-filter/price-filter.component';
import { StatusFilterComponent } from './filtering/status-filter/status-filter.component';
import { CategoryFilterComponent } from './filtering/category-filter/category-filter.component';
import { ResetFilterRouteComponent } from './filtering/reset-filter-route/reset-filter-route.component';
import { ProductItemListComponent } from './product-item-list/product-item-list.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductDetailsThumbComponent } from './pages/product-details-thumb/product-details-thumb.component';
import { ProductDetailsWrapperComponent } from './pages/product-details-wrapper/product-details-wrapper.component';
import { ProductDetailsTabNavComponent } from './pages/product-details-tab-nav/product-details-tab-nav.component';
import { ProductDetailsRelatedProductsComponent } from './pages/product-details-related-products/product-details-related-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PagesModule } from '../pages/pages.module';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductItemLargeComponent,
    ShopAreaComponent,
    PriceFilterComponent,
    StatusFilterComponent,
    CategoryFilterComponent,
    ResetFilterRouteComponent,
    ProductItemListComponent,
    ShopComponent,
    ProductDetailsComponent,
    ProductDetailsThumbComponent,
    ProductDetailsWrapperComponent,
    ProductDetailsTabNavComponent,
    ProductDetailsRelatedProductsComponent,
    CartComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ShopRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ProductItemComponent,
    ProductItemLargeComponent,
    ShopAreaComponent,
    PriceFilterComponent
  ]
})
export class ShopModule { }
