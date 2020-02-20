import { Routes } from '@angular/router';

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

export const AdminLayoutRoutes: 
Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'banner',         component: BannerComponent },
    { path: 'tabs',           component: TabsComponent },
    { path: 'menus',          component: MenusComponent },
    { path: 'slides',         component: SlidesComponent },
    { path: 'roles',          component: RolesComponent },
    { path: 'notificaciones', component: NotificacionesComponent },
    { path: 'theme',          component: ThemeComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
