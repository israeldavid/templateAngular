import { Component, OnInit } from '@angular/core';
import { PopupsService } from '../servicios/popups.service';
import { responsePopups } from '../interfaces/interface.popup';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {
  token:any;
  responsePopup:responsePopups;
  constructor(private ps:PopupsService,private sanitized: DomSanitizer,
    private route:Router,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.cargarPopups();
  }

  cargarPopups(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.ps.obtenerPopup(this.token).subscribe(data => { 
      this.responsePopup=data;  
      this.SpinnerService.hide();
    });
  }

  crearPopup(){
    this.route.navigateByUrl("crearpopup");
  }

  editarPopup(idpopup:number){
    this.route.navigateByUrl("editarpopup/"+idpopup);
  }

  eliminarPopup(idpopup:number){
    this.ps.deletePopUp(idpopup,this.token=localStorage.getItem('token'));
    this.route.navigateByUrl("admin/(popups)")
  }

}
