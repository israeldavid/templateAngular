import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { BannerComponent } from '../../banner/banner.component';
import { TabsComponent } from '../../tabs/tabs.component';
import { MenusComponent } from '../../menus/menus.component';
import { SlidesComponent } from '../../slides/slides.component';
import { ThemeComponent } from '../../theme/theme.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RolesComponent } from '../../roles/roles.component';
import { NotificacionesComponent } from '../../notificaciones/notificaciones.component';
import { MultiaplicacionComponent } from '../../multiaplicacion/multiaplicacion.component';
import { MultiempresaComponent } from '../../multiempresa/multiempresa.component';
import { PopupsComponent} from '../../popups/popups.component';
import { ReporteComponent } from '../../reporte/reporte.component';
import { UbicanosComponent } from '../../ubicanos/ubicanos.component';

//Charts
import { ChartsModule } from 'ng2-charts';

//Loading
import { NgxSpinnerModule } from 'ngx-spinner';

//emojis
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ChartsModule,
    NgxSpinnerModule,
    PickerModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    BannerComponent,
    TabsComponent,
    MenusComponent,
    SlidesComponent,
    ThemeComponent,
    UpgradeComponent,
    RolesComponent,
    MultiempresaComponent,
    NotificacionesComponent,
    MultiaplicacionComponent,
    PopupsComponent,
    ReporteComponent,
    UbicanosComponent
  ]
})

export class AdminLayoutModule {}
