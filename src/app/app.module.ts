import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';

//Servicios
import { BannerService } from './servicios/banner.service';
import { MatDialogConfig, MatDialog, MatDialogModule, MatSelectModule   } from '@angular/material';
//import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MaterialModule } from './material.module';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { CrearComponent } from './banner/crear/crear.component';
import { CrearempresaComponent } from './user-profile/crearempresa/crearempresa.component';
import { CrearaplicacionComponent } from './multiaplicacion/crearaplicacion/crearaplicacion.component';
import { CreartabsComponent } from './tabs/creartabs/creartabs.component';
import { CrearmenusComponent } from './menus/crearmenus/crearmenus.component';
import { CrearslidesComponent } from './slides/crearslides/crearslides.component';
import { CrearthemesComponent } from './theme/crearthemes/crearthemes.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
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
    CrearthemesComponent
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
