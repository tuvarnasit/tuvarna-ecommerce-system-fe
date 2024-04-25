import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';
import { NgxSliderModule } from 'ngx-slider-v2';
import { SharedModule } from '@/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    NgxSliderModule,
    SharedModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ShopModule { }
