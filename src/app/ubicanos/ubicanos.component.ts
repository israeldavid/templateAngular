import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UbicanosService } from '../servicios/ubicanos.service';
import { responseCoordenada } from '../interfaces/interface.coordenada';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-ubicanos',
  templateUrl: './ubicanos.component.html',
  styleUrls: ['./ubicanos.component.scss']
})
export class UbicanosComponent implements OnInit {
  token:any;
  responseCoordenada:responseCoordenada;
  constructor(private route:Router,private us:UbicanosService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.cargarUbicaciones();
  }

  cargarUbicaciones(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.us.obtenerUbicaciones(this.token).subscribe(data => { 
      this.responseCoordenada=data;  
      this.SpinnerService.hide();
    });
  }

  crearUbicacion(){
    this.route.navigateByUrl("crearubicacion");
  }

  eliminarUbicacion(idUbicacion:number){
    this.us.deleteUbicanos(idUbicacion,localStorage.getItem('token'));
    this.route.navigateByUrl("admin/(ubicanos)");
  }

  editarUbicacion(idUbicacion:number){
    this.route.navigateByUrl("editarubicacion/"+idUbicacion)
  }

}
