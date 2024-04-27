import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@/shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
