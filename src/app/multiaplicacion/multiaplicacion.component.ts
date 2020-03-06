import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AplicacionService } from '../servicios/aplicacion.service';
import { responseAplicacion } from '../interfaces/interface.aplicacion';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-multiaplicacion',
  templateUrl: './multiaplicacion.component.html',
  styleUrls: ['./multiaplicacion.component.scss']
}) 

export class MultiaplicacionComponent implements OnInit {

  responseAplicacion: responseAplicacion;
  token:any;
  empresaId:{id:number};
  constructor(private dialog: MatDialog,private _location: Location,
              private router:Router,private es:AplicacionService,
              private rutaActiva: ActivatedRoute,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.empresaId = {
      id:this.rutaActiva.snapshot.params.idaplicacion
    }
    this.consultarAplicaciones(this.empresaId.id);
  }

  consultarAplicaciones(idEmpresa:number){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.es.obtenerAplicacionByEmpresa(idEmpresa,this.token).subscribe(data => { 
      this.responseAplicacion=data;  
      this.SpinnerService.hide();
    });
  }

  crearaplicacion(){
    this.router.navigateByUrl("crearaplicacion");
  }

  regresar(){
    this._location.back();
  }

  editarApp(idApp:number){
    this.router.navigateByUrl("editaraplicacion/"+idApp)
  }

  eliminarApp(idAplicacion:number){
    this.es.deleteAplicacion(idAplicacion,this.token=localStorage.getItem('token'));
    this.router.navigateByUrl("admin/(user-profile)")
  }


}
