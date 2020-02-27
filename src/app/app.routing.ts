import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CrearComponent } from './banner/crear/crear.component';

const routes: Routes =[
  {
    path: '',
    component: LoginComponent,
    children: [
        { path: '', redirectTo: 'login', pathMatch: 'prefix'}],
  },
    {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'admin',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  },
  {
    path:'crear',
    component:CrearComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
