import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../servicios/empresa.service';
import { responseEmpresa,Empresa } from '../interfaces/interface.empresa';
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  responseEmpresa: responseEmpresa;
  token:any;

  constructor(private route:Router,private es:EmpresaService,
              private SpinnerService: NgxSpinnerService,
              private _location:Location) { }

  ngOnInit() {
    this.consultarEmpresas();
  }

  consultarEmpresas(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
      this.SpinnerService.hide();
    });
  }

  crearEmpresa(){
    this.route.navigateByUrl("crearempresa");
  }

  eliminarEmpresa(idEmpresa:number){
    if(window.confirm('Estas seguro de eliminar ?')){
    this.es.deleteEmpresa(idEmpresa,this.token=localStorage.getItem('token'));
    this.consultarEmpresas();
    } else {
      alert("No se eliminó la empresa");
    }
  }

  editarEmpresa(idEmpresa:number){
    this.route.navigateByUrl("editarempresa/"+idEmpresa)
  }

  regresar(){
    this._location.back();
  }
}
