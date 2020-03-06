import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';

//Servicios
import { BannerService } from './servicios/banner.service';
import { MatDialogConfig, MatDialog, MatDialogModule, MatSelectModule   } from '@angular/material';
//Loading
import { NgxSpinnerModule } from "ngx-spinner"; 
//import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MaterialModule } from './material.module';
//Componentes
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CrearComponent } from './banner/crear/crear.component';
import { CrearempresaComponent } from './user-profile/crearempresa/crearempresa.component';
import { CrearaplicacionComponent } from './multiaplicacion/crearaplicacion/crearaplicacion.component';
import { CreartabsComponent } from './tabs/creartabs/creartabs.component';
import { CrearmenusComponent } from './menus/crearmenus/crearmenus.component';
import { CrearslidesComponent } from './slides/crearslides/crearslides.component';
import { CrearthemesComponent } from './theme/crearthemes/crearthemes.component';
import { CrearPopupComponent } from './popups/crear/crearpopup.component';
import { CrearubicacionComponent } from './ubicanos/crearubicacion/crearubicacion.component';
import { EditarempresaComponent } from './user-profile/editarempresa/editarempresa.component';
import { EditaraplicacionComponent } from './multiaplicacion/editaraplicacion/editaraplicacion.component';
import { EditartabsComponent } from './tabs/editartabs/editartabs.component';
import { EditarmenusComponent } from './menus/editarmenus/editarmenus.component';
import { EditarslidesComponent } from './slides/editarslides/editarslides.component';
import { EditarthemeComponent } from './theme/editartheme/editartheme.component';
import { EditarpopupsComponent } from './popups/editarpopups/editarpopups.component';
import { EditarubicacionComponent } from './ubicanos/editarubicacion/editarubicacion.component';
import { EditarbannerComponent } from './banner/editarbanner/editarbanner.component';
import { CreargruposComponent } from './notificaciones/creargrupos/creargrupos.component';
import { EditargrupoComponent } from './notificaciones/editargrupo/editargrupo.component';
import { CrearrolComponent } from './roles/crearrol/crearrol.component';
import { EditarrolComponent } from './roles/editarrol/editarrol.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    MatDialogModule,
    MatSelectModule,
    NgxSpinnerModule,
    //MatInputModule,
    //MatCheckboxModule,
    //MatButtonModule,
    ///MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    CrearComponent,
    CrearempresaComponent,
    CrearaplicacionComponent,
    CreartabsComponent,
    CrearmenusComponent,
    CrearslidesComponent,
    CrearthemesComponent,
    CrearPopupComponent,
    CrearubicacionComponent,
    EditarempresaComponent,
    EditaraplicacionComponent,
    EditartabsComponent,
    EditarmenusComponent,
    EditarslidesComponent,
    EditarthemeComponent,
    EditarpopupsComponent,
    EditarubicacionComponent,
    EditarbannerComponent,
    CreargruposComponent,
    EditargrupoComponent,
    CrearrolComponent,
    EditarrolComponent
  ],
  providers: [BannerService,
    MatDialog,
    //MatButtonModule,
    //MatIconModule,
    MatDialogConfig,
    MatDialogModule,
    MatSelectModule,
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
