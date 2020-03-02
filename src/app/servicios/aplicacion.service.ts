import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseAplicacion, Aplicacion} from '../interfaces/interface.aplicacion';

const url = environment.direccionAplicacion;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  constructor(private httpService: HttpClient) { }

  obtenerAplicacion(access_token){
    return this.httpService.get<responseAplicacion>(url,this.getRequestHeaders(access_token));
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addAplicacion(aplicacion: Aplicacion,access_token) {
    try {
      console.log(aplicacion,access_token);
      return this.httpService.post<Aplicacion>(url, this.getRequestHeaders(access_token));
    } catch (error) {
      console.log(error);
    }
  }

  editAplicacion(){
    console.log("Editar Aplicacion");
  }

  deleteAplicacion(){
    console.log("Eliminar Aplicacion");
  }
  
}