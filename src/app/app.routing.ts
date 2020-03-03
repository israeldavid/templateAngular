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
import { EditartabsComponent } from './tabs/editartabs/editartabs.component';
import { CrearmenusComponent } from './menus/crearmenus/crearmenus.component';
import { EditarmenusComponent } from './menus/editarmenus/editarmenus.component';
import { CrearslidesComponent } from './slides/crearslides/crearslides.component';
import { EditarslidesComponent } from './slides/editarslides/editarslides.component';
import { CrearthemesComponent } from './theme/crearthemes/crearthemes.component';
import { EditarthemeComponent } from './theme/editartheme/editartheme.component';
import { CrearPopupComponent } from './popups/crear/crearpopup.component';
import { EditarpopupsComponent } from './popups/editarpopups/editarpopups.component';
import { CrearubicacionComponent } from './ubicanos/crearubicacion/crearubicacion.component';
import { EditarubicacionComponent } from './ubicanos/editarubicacion/editarubicacion.component';

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
    path:'editartabs/:idtabs',
    component:EditartabsComponent
  },
  {
    path:'crearmenus',
    component:CrearmenusComponent
  },
  {
    path:'editarmenus/:idmenu',
    component:EditarmenusComponent
  },
  {
    path:'crearslides',
    component:CrearslidesComponent
  },
  {
    path:'editarslides/:idslide',
    component:EditarslidesComponent
  },
  {
    path:'crearthemes',
    component:CrearthemesComponent
  },
  {
    path:'editarthemes/:idtheme',
    component:EditarthemeComponent
  },
  {
    path:'crearpopup',
    component:CrearPopupComponent
  },
  {
    path:'editarpopup/:idpopup',
    component:EditarpopupsComponent
  },
  {
    path:'crearubicacion',
    component:CrearubicacionComponent
  },
  {
    path:'editarubicacion/:idubicacion',
    component:EditarubicacionComponent
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
