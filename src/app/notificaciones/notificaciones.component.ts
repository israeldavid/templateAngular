import { Component, OnInit } from '@angular/core';
import { TabsService } from '../servicios/tabs.service';
import { responseTabs } from '../interfaces/interface.tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  responseTabs: responseTabs;
  constructor(private ts:TabsService,private sanitized: DomSanitizer,private route:Router) { }

  ngOnInit() {
    this.consultarTabs();
  }
  consultarTabs(){
    this.ts.obtenerTabs().subscribe(data => { 
      this.responseTabs=data;  
    });
  }

  crearAplicacion(){
    this.route.navigateByUrl("crearaplicacion");
  }

  crearGrupo(){
    this.route.navigateByUrl("creargrupo")
  }

}
