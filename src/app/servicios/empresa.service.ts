import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseEmpresa, Empresa} from '../interfaces/interface.empresa';
import { Observable } from 'rxjs';

const url = environment.direccionEmpresa;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  mensaje:string;
  datosEmpresa:Empresa;
  
  constructor(private httpService: HttpClient) { }

  obtenerEmpresas(access_token){
    return this.httpService.get<responseEmpresa>(url,this.getRequestHeaders(access_token));
  }

  obtenerEmpresaXId(idEmpresa:number,access_token){
    let direccion=url+"/aplication/"+idEmpresa;
    return this.httpService.get<Empresa>(direccion,this.getRequestHeaders(access_token))
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addEmpresa(empresa: Empresa,access_token:any) {
    try {
      this.httpService.post<Empresa>(url, empresa, this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Empresa Ingresada Correctamente"),
        error => alert("Empresa no pudo ser creada, Error de proceso"));
    } catch (error) {
      console.log(error);
    }
  }

  editEmpresa(idEmpresa:number,empresa,access_token){
    let direccion=url+"/"+idEmpresa;
    this.httpService.put<Empresa>(direccion, empresa, this.getRequestHeaders(access_token))
  }

  deleteEmpresa(idEmpresa:number,access_token){
    let direccion=url+"/"+idEmpresa;
    this.httpService.delete<Empresa>(direccion,this.getRequestHeaders(access_token)).subscribe(data => alert("Empresa Eliminada"));
  }
  
}
