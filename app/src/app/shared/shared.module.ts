import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeaderComponent } from './header/header.component';
import { NiceSelectComponent } from './header/ui/nice-select/nice-select.component';

@NgModule({
  declarations: [
    TopBarComponent,
    HeaderComponent,
    NiceSelectComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[
    HeaderComponent,
  ]
})
export class SharedModule { }
