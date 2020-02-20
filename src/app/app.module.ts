import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
//Servicios
import { BannerService } from './servicios/banner.service';
//import { MatDialogConfig, MatDialog } from '@angular/material';
//import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MaterialModule } from './material.module';
import { MultiempresaComponent } from './multiempresa/multiempresa.component';
import { MultiaplicacionComponent } from './multiaplicacion/multiaplicacion.component';
import { LoginComponent } from './login/login.component';

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
    MultiempresaComponent,
    MultiaplicacionComponent,
    LoginComponent
  ],
  providers: [BannerService,
    //MatDialog,
    //MatButtonModule,
    //MatIconModule,
    //MatDialogConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
