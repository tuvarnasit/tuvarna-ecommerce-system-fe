import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { FeatureComponent } from '../home/feature/feature.component';
import { SharedModule } from '../shared/shared.module';
import { TrendingProductsComponent } from './trending-products/trending-products.component'
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  declarations: [
    ElectronicsComponent,
    CategoryOverviewComponent,
    FeatureComponent,
    TrendingProductsComponent,
    HeroBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    ShopModule
  ]
})
export class HomeModule { }
