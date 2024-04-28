import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SharedModule } from '@/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductItemLargeComponent } from './product-item-large/product-item-large.component';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopAreaComponent } from './shop-area/shop-area.component';
import { PriceFilterComponent } from './filtering/price-filter/price-filter.component';
import { StatusFilterComponent } from './filtering/status-filter/status-filter.component';
import { CategoryFilterComponent } from './filtering/category-filter/category-filter.component';
import { ResetFilterRouteComponent } from './filtering/reset-filter-route/reset-filter-route.component';
import { ProductItemListComponent } from './product-item-list/product-item-list.component';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductItemLargeComponent,
    ShopAreaComponent,
    PriceFilterComponent,
    StatusFilterComponent,
    CategoryFilterComponent,
    ResetFilterRouteComponent,
    ProductItemListComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ShopRoutingModule
  ],
  exports: [
    ProductItemComponent,
    ProductItemLargeComponent,
    ShopAreaComponent,
    PriceFilterComponent
  ]
})
export class ShopModule { }
