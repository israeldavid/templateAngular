import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseAplicacion, Aplicacion, empresaXApp} from '../interfaces/interface.aplicacion';

const url = environment.direccionAplicacion;

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  empresa:empresaXApp={idEmpresa:0};
  constructor(private httpService: HttpClient) { }

  obtenerAplicacionByEmpresa(idEmpresa:number,access_token){
    let direccion = url + "/ByIdEmpresa/";
    this.empresa.idEmpresa=idEmpresa;
    console.log(this.empresa);
    return this.httpService.post<responseAplicacion>(direccion,this.empresa,this.getRequestHeaders(access_token));
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