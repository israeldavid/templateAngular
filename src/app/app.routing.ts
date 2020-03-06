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
import { EditarbannerComponent } from './banner/editarbanner/editarbanner.component';
import { CreargruposComponent } from './notificaciones/creargrupos/creargrupos.component';
import { EditargrupoComponent } from './notificaciones/editargrupo/editargrupo.component';
import { CrearrolComponent } from './roles/crearrol/crearrol.component';
import { EditarrolComponent } from './roles/editarrol/editarrol.component';
import { CrearperfilComponent } from './roles/perfiles/crearperfil/crearperfil.component';
import { EditarperfilComponent } from './roles/perfiles/editarperfil/editarperfil.component';

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
    path:'editarbanner/:idBanner',
    component:EditarbannerComponent
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
  },
  {
    path:'creargrupo',
    component:CreargruposComponent
  },
  {
    path:'editargrupo/:idgrupo',
    component:EditargrupoComponent
  },
  {
    path:'crearrol',
    component:CrearrolComponent
  },
  {
    path:'editarrol/:idrol',
    component:EditarrolComponent
  },
  {
    path:'crearperfil',
    component:CrearperfilComponent
  },
  {
    path:'editarperfil/:idperfil',
    component:EditarperfilComponent
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
