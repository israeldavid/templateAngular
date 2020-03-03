import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AplicacionService } from '../servicios/aplicacion.service';
import { responseAplicacion } from '../interfaces/interface.aplicacion';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-multiaplicacion',
  templateUrl: './multiaplicacion.component.html',
  styleUrls: ['./multiaplicacion.component.scss']
}) 

export class MultiaplicacionComponent implements OnInit {

  responseAplicacion: responseAplicacion;
  token:any;
  empresaId:{id:number};
  constructor(private dialog: MatDialog,private router:Router,private es:AplicacionService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.empresaId = {
      id:this.rutaActiva.snapshot.params.idaplicacion
    }
    this.consultarAplicaciones(this.empresaId.id);
  }

  consultarAplicaciones(idEmpresa:number){
    this.token=localStorage.getItem('token');
    this.es.obtenerAplicacionByEmpresa(idEmpresa,this.token).subscribe(data => { 
      this.responseAplicacion=data;  
    });
  }

  crearaplicacion(){
    this.router.navigateByUrl("crearaplicacion");
  }
}
