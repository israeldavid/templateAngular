import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseAplicacion, Aplicacion, AppXid, empresaXApp} from '../interfaces/interface.aplicacion';

const url = environment.direccionAplicacion;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  empresa:empresaXApp={idEmpresa:0};
  constructor(private httpService: HttpClient) { }

  obtenerAplicaciones(access_token){
    return this.httpService.get<responseAplicacion>(url,this.getRequestHeaders(access_token));
  }

  obtenerAplicacionByEmpresa(idEmpresa:number,access_token){
    let direccion = url + "/ByIdEmpresa/";
    this.empresa.idEmpresa=idEmpresa;
    return this.httpService.post<responseAplicacion>(direccion,this.empresa,this.getRequestHeaders(access_token));
  }

  obtenerAplicacionById(idAplicacion:number,access_token){
    let direccion=url+"/"+idAplicacion;
    return this.httpService.get<AppXid>(direccion,this.getRequestHeaders(access_token));
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
      this.httpService.post<Aplicacion>(url, aplicacion, this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Aplicación Ingresada Correctamente"),
        error => alert("Aplicación no pudo ser creada, Error de proceso"));
    } catch (error) {
      console.log(error);
    }
  }

  editAplicacion(aplicacion: Aplicacion,access_token){
    return this.httpService.put<AppXid>(url, aplicacion, this.getRequestHeaders(access_token))
  }

  deleteAplicacion(idAplicacion:number,access_token){
    let direccion=url+"/"+idAplicacion;
    this.httpService.delete<Aplicacion>(direccion,this.getRequestHeaders(access_token))
    .subscribe(
      data  => alert("Aplicación Eliminada Correctamente"),
      error => alert("Aplicación no pudo ser eliminada, Error de proceso")
    );
  }
  
}