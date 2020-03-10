import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from '@angular/common';
import { ThemeService } from '../servicios/theme.service'
import { Theme,responseTheme,ThemeXid } from 'app/interfaces/interface.theme';
import { AplicacionService } from '../servicios/aplicacion.service';
import { responseAplicacion, Aplicacion} from '../interfaces/interface.aplicacion';
import * as fileSaver from 'file-saver';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {
  token:any;
  responseTheme:responseTheme;
  responseAplicacion: responseAplicacion;

  constructor(private route:Router,private _location: Location,
              private SpinnerService: NgxSpinnerService,
              private ts:ThemeService,private as:AplicacionService,
              ) { }

  ngOnInit() {
    //this.consultarThemes();
    this.consultarAplicaciones();
  }

  consultarAplicaciones(){
    this.SpinnerService.show();
    this.as.obtenerAplicaciones(localStorage.getItem('token')).subscribe(data => { 
      this.responseAplicacion=data;  
      this.SpinnerService.hide();
    });
  }

  consultarThemes(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.ts.obtenerTheme(this.token).subscribe(data => { 
      this.responseTheme=data;  
      this.SpinnerService.hide();
    }, err => {
      alert("No se encontraron Themes para esa aplicacion")
    });
  }

  regresar(){
    this._location.back();
  }

  cambioSeleccionado(event){
    const IdAplicacion = event.target.value;
    this.ts.obtenerThemesByAplicacion(IdAplicacion,this.token).subscribe(
      data => { 
        this.responseTheme=data; 
      }, err => {
        alert("No se han encontrado Registros");
    });
  }

  crearTheme(){
    this.route.navigateByUrl("crearthemes");
  }

  editartheme(idTheme:number){
    this.route.navigateByUrl("editarthemes/"+idTheme);
  }

  eliminartheme(idTheme:number){
    if(window.confirm('Estas seguro de eliminar ?')){
      this.ts.deleteTheme(idTheme,localStorage.getItem('token'));
      this.route.navigateByUrl("admin/(theme)");
    } else {
      alert("No se elimino el Theme");
    }
  }

  descargartheme(idTheme:number){
    this.ts.descargarTheme(idTheme,localStorage.getItem('token')).subscribe(response => {
			//let blob:any = new Blob([response.blob()], { type: 'text/json; charset=utf-8' });
			//const url= window.URL.createObjectURL(blob);
			//window.open(url);
			window.location.href = response.url;
			fileSaver.saveAs(Blob, 'themes.json');
		}), error => console.log('Error al descargar el archivo'),
        () => console.info('Archivo descargado exitosamente');
  }
}
