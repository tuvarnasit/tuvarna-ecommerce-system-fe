import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsComponent } from './electronics/electronics.component';

const routes: Routes = [
  {
    path: '',
    component: ElectronicsComponent,
    title: 'TuVarna - Ecommerce Management System'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
