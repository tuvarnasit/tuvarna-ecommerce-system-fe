import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SharedModule } from '@/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductItemLargeComponent } from './product-item-large/product-item-large.component';



@NgModule({
  declarations: [
    ProductItemComponent,
    ProductItemLargeComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SharedModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductItemComponent,
    ProductItemLargeComponent
  ]
})
export class ShopModule { }
