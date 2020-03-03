import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CrearComponent } from './banner/crear/crear.component';
import { CrearempresaComponent } from './user-profile/crearempresa/crearempresa.component';
import { EditarempresaComponent } from './user-profile/editarempresa/editarempresa.component';
import { CrearaplicacionComponent } from './multiaplicacion/crearaplicacion/crearaplicacion.component';
import { EditaraplicacionComponent } from './multiaplicacion/editaraplicacion/editaraplicacion.component';
import { CreartabsComponent } from './tabs/creartabs/creartabs.component';
import { CrearmenusComponent } from './menus/crearmenus/crearmenus.component';
import { CrearslidesComponent } from './slides/crearslides/crearslides.component';
import { CrearthemesComponent } from './theme/crearthemes/crearthemes.component';
import { CrearPopupComponent } from './popups/crear/crearpopup.component';
import { CrearubicacionComponent } from './ubicanos/crearubicacion/crearubicacion.component';

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
  },
  {
    path:'crearempresa',
    component:CrearempresaComponent
  },
  {
    path:'editarempresa/:idempresa',
    component:EditarempresaComponent
  },
  {
    path:'crearaplicacion',
    component:CrearaplicacionComponent
  },
  {
    path:'editaraplicacion/:idaplicacion',
    component:EditaraplicacionComponent
  },
  {
    path:'creartabs',
    component:CreartabsComponent
  },
  {
    path:'crearmenus',
    component:CrearmenusComponent
  },
  {
    path:'crearslides',
    component:CrearslidesComponent
  },
  {
    path:'crearthemes',
    component:CrearthemesComponent
  },
  {
    path:'crearpopup',
    component:CrearPopupComponent
  },
  {
    path:'crearubicacion',
    component:CrearubicacionComponent
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
