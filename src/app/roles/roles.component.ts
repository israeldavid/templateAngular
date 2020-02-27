import { Component, OnInit } from '@angular/core';
import { TabsService } from '../servicios/tabs.service';
import { responseTabs } from '../interfaces/interface.tabs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  responseTabs: responseTabs;
  
  constructor(private ts:TabsService,private sanitized: DomSanitizer) { }

  ngOnInit() {
    this.consultarTabs();
  }

  consultarTabs(){

  }

  nuevoRol(){
    alert("Por Implementar los Roles")
  }
}
