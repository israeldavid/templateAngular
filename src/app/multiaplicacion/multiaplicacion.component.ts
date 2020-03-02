import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AplicacionService } from '../servicios/aplicacion.service';
import { responseAplicacion } from '../interfaces/interface.aplicacion';

@Component({
  selector: 'app-multiaplicacion',
  templateUrl: './multiaplicacion.component.html',
  styleUrls: ['./multiaplicacion.component.scss']
}) 

export class MultiaplicacionComponent implements OnInit {

  responseAplicacion: responseAplicacion;
  token:any;

  constructor(private dialog: MatDialog,private router:Router,private es:AplicacionService) { }

  ngOnInit() {
    this.consultarAplicaciones();
  }

  consultarAplicaciones(){
    this.token=localStorage.getItem('token');
    this.es.obtenerAplicacion(this.token).subscribe(data => { 
      this.responseAplicacion=data;  
    });
  }
  crearaplicacion(){
    this.router.navigateByUrl("crearaplicacion");
  }
}
