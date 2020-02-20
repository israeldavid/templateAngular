import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: 'user-profile', title: 'Perfil',  icon:'person', class: '' },
    { path: 'banner', title: 'Banner',  icon:'content_paste', class: '' },
    { path: 'tabs', title: 'Tabs',  icon:'library_books', class: '' },
    { path: 'menus', title: 'Menus',  icon:'menus', class: '' },
    { path: 'slides', title: 'Slides',  icon:'maps', class: '' },
    { path: 'roles', title: 'Roles',  icon:'check_circle', class: '' },
    { path: 'notificaciones', title: 'Notificaciones',  icon:'aspect_ratio', class: '' },
    { path: 'theme', title: 'Theme',  icon:'bubble_chart', class: '' },
    { path: 'upgrade', title: 'Logout',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
