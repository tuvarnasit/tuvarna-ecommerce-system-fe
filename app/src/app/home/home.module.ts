import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ElectronicsComponent } from './electronics/electronics.component';
import {SharedModule} from '../shared/shared.module'

@NgModule({
  declarations: [
    ElectronicsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
