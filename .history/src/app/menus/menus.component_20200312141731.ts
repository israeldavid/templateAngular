import { Component, OnInit } from '@angular/core';
import { menusService } from '../servicios/menus.services';
import { responseMenu } from '../interfaces/interface.menu';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  responseMenus: responseMenu;
  token: any;

  // Variables para la paginación
  page: any = 1;
  pageSize: any = 4;
  collectionSize: number;
  numeroItems = 4;

  constructor(private ms: menusService, private route: Router,
              private sanitized: DomSanitizer,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.consultarMenus();
  }

  consultarMenus() {
    this.token = localStorage.getItem('token');
    this.SpinnerService.show();
    this.ms.obtenerMenus(this.token).subscribe(data => {
      this.responseMenus = data;
      this.collectionSize = data.count;
      this.SpinnerService.hide();
    }, err => {
      this.SpinnerService.hide();
    });
  }

  crearMenu() {
    this.route.navigateByUrl('crearmenus');
  }

  editarMenu(idMenu: number) {
    this.route.navigateByUrl('editarmenus/' + idMenu);
  }

  eliminarMenu(idMenu: number) {
    if (window.confirm('Estas seguro de eliminar ?')) {
      this.ms.deleteMenu(idMenu, this.token = localStorage.getItem('token'));
      this.route.navigateByUrl('admin/(menus)')
    } else {
      alert('No se elimino el menu');
    }
  }

}
