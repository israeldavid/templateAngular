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
        console.log(ubicacion,access_token);
        return this.httpService.post<Coordenada>(url, this.getRequestHeaders(access_token));
      } catch (error) {
        console.log(error);
      }
    }

    editUbicanos(){
      console.log("Editar Ubicanos...")
    }
  
    deleteUbicanos(){
      console.log("Eliminar Ubicanos...")
    }
  }