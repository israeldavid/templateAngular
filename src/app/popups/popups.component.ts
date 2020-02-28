import { Component, OnInit } from '@angular/core';
import { PopupsService } from '../servicios/popups.service';
import { responsePopups } from '../interfaces/interface.popup';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {
  token:any;
  responsePopup:responsePopups;
  constructor(private ps:PopupsService,private sanitized: DomSanitizer,private route:Router) { }

  ngOnInit() {
    this.cargarPopups();
  }

  cargarPopups(){
    this.token=localStorage.getItem('token');
    this.ps.obtenerPopup(this.token).subscribe(data => { 
      this.responsePopup=data;  
    });
  }

  crearPopup(){
    this.route.navigateByUrl("crearpopup");
  }

}
