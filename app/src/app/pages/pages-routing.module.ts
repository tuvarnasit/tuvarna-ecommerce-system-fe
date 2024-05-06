import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent,
    title: 'Търсене'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Влизане'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Регистрация'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
