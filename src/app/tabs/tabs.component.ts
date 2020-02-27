import { Component, OnInit } from '@angular/core';
import { TabsService } from '../servicios/tabs.service';
import { responseTabs } from '../interfaces/interface.tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  responseTabs: responseTabs;

  constructor(private ts:TabsService,private sanitized: DomSanitizer,private route:Router) { }

  ngOnInit() {
    this.consultarTabs();
  }

  consultarTabs(){
    this.ts.obtenerTabs().subscribe(data => { 
      console.log(data);
      this.responseTabs=data;  
    });
  }

  crearTabs(){
    this.route.navigateByUrl("creartabs");
  }

}
