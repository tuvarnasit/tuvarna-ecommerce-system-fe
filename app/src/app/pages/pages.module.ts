import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@/shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register-form/register-form.component';



@NgModule({
  declarations: [
    SearchComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ShopModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class PagesModule { }
