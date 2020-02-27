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
  token:any;
  constructor(private ts:TabsService,private sanitized: DomSanitizer,private route:Router) { }

  ngOnInit() {
    this.consultarTabs();
  }

  consultarTabs(){
    this.token=localStorage.getItem('token');
    this.ts.obtenerTabs(this.token).subscribe(data => { 
      this.responseTabs=data;  
    });
  }

  crearTabs(){
    this.route.navigateByUrl("creartabs");
  }

}
