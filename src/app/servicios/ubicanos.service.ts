import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responseCoordenada,Coordenada } from '../interfaces/interface.coordenada';

const url = environment.direccionUbicanos;

@Injectable({
    providedIn: 'root'
  })
  export class UbicanosService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerUbicaciones(access_token){
      return this.httpService.get<responseCoordenada>(url,this.getRequestHeaders(access_token));
    }
    
    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      });
      return { headers: headers };  
    }

    addUbicacion(ubicacion: Coordenada,access_token){
      try {
        this.httpService.post<Coordenada>(url, ubicacion, this.getRequestHeaders(access_token))
        .subscribe( 
          data => alert("Coordenadas Ingresada Correctamente"),
          error => alert("Coordenada no pudo ser creada, Error de proceso")
        );
      } catch (error) {
        console.log(error);
      }
    }

    editUbicanos(ubicacion: Coordenada,access_token){
      console.log("Editar Ubicanos...")
    }
  
    deleteUbicanos(IdUbicacion: number,access_token){
      let direccion=url+"/"+IdUbicacion;
      this.httpService.delete<Coordenada>(direccion,this.getRequestHeaders(access_token))
    .subscribe(
      data  => alert("Ubicación Eliminada Correctamente"),
      error => alert("La Ubicación no pudo ser eliminada, Error de proceso")
    );
    }
  }