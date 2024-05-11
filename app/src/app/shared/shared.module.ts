import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeaderComponent } from './header/header.component';
import { NiceSelectComponent } from './header/ui/nice-select/nice-select.component';
import { HeaderCategoryComponent } from './header-category/header-category.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PaginationComponent } from './pagination/pagination.component';
import { BreadcrumbProductDetailsComponent } from './breadcrumb-product-details/breadcrumb-product-details.component';
import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { MobileSidebarComponent } from './mobile-sidebar/mobile-sidebar.component';

@NgModule({
  declarations: [
    TopBarComponent,
    HeaderComponent,
    NiceSelectComponent,
    HeaderCategoryComponent,
    MenuBarComponent,
    SocialLinksComponent,
    FooterComponent,
    BreadcrumbComponent,
    PaginationComponent,
    BreadcrumbProductDetailsComponent,
    CartSidebarComponent,
    MobileSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    NiceSelectComponent,
    PaginationComponent,
    BreadcrumbProductDetailsComponent,
    CartSidebarComponent
  ]
})
export class SharedModule { }
