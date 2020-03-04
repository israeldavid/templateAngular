import { Component, OnInit } from '@angular/core';
import { menusService } from '../servicios/menus.services';
import { responseMenu } from '../interfaces/interface.menu';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {
  responseMenus: responseMenu;
  token:any;
  constructor(private ms:menusService,private route:Router) { }

  ngOnInit() {
    this.consultarMenus();
  }

  consultarMenus(){
    this.token=localStorage.getItem('token');
    this.ms.obtenerMenus(this.token).subscribe(data => { 
      this.responseMenus=data;  
    });
  }

  crearMenu(){
    this.route.navigateByUrl("crearmenus");
  }

  eliminarMenu(idMenu:number){
    this.ms.deleteMenu(idMenu,this.token=localStorage.getItem('token'));
    this.route.navigateByUrl("admin/(menus)")
  }

}
