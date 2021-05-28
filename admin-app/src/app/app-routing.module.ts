import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user/user.component'
import { ServiceComponent } from './service/service.component'
import { LoginComponent } from './auth/components/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ListserviceComponent } from './listservice/listservice.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'service', component: ServiceComponent },
      { path: 'listservice', component: ListserviceComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
