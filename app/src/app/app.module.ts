import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { ShopComponent } from './shop/pages/shop/shop.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ShopModule
  ],
  exports: [
    ShopComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
