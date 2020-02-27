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

  constructor(private ms:menusService,private route:Router) { }

  ngOnInit() {
    this.consultarMenus();
  }

  consultarMenus(){
    this.ms.obtenerMenus().subscribe(data => { 
      this.responseMenus=data;  
      console.log(this.responseMenus);
    });
  }

  crearMenu(){
    this.route.navigateByUrl("crearmenus");
  }

}
