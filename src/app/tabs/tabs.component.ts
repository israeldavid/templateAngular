import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TabsService } from '../servicios/tabs.service';
import { responseTabs } from '../interfaces/interface.tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  responseTabs: responseTabs;
  token:any;
  constructor(private ts:TabsService,private sanitized: DomSanitizer,
              private route:Router,private _location: Location,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.consultarTabs();
  }

  consultarTabs(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.ts.obtenerTabs(this.token).subscribe(data => { 
      this.responseTabs=data;  
      this.SpinnerService.hide();
    });
  }

  crearTabs(){
    this.route.navigateByUrl("creartabs");
  }

  regresar(){
    this._location.back();
  }

  eliminarTabs(idTab:number){
    this.ts.deleteTabs(idTab,this.token=localStorage.getItem('token'));
    this.route.navigateByUrl("admin/(tabs)");
  }

  editarTabs(idTab:number){
    this.route.navigateByUrl("editartabs/"+idTab);
  }

}
