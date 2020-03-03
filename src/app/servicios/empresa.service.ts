import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseEmpresa, Empresa,EmpresaXid} from '../interfaces/interface.empresa';
import { Observable } from 'rxjs';

const url = environment.direccionEmpresa;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  mensaje:string;
    
  constructor(private httpService: HttpClient) { }

  //Listas
  obtenerEmpresas(access_token){
    return this.httpService.get<responseEmpresa>(url,this.getRequestHeaders(access_token));
  }
  //Solo una
  obtenerEmpresaXId(idEmpresa:number,access_token){
    let direccion=url+"/aplication/"+idEmpresa;
    return this.httpService.get<EmpresaXid>(direccion,this.getRequestHeaders(access_token));
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }
  //Añadir nuevo
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

  editEmpresa(empresa,access_token){
    console.log(empresa);
    return this.httpService.put<EmpresaXid>(url, empresa, this.getRequestHeaders(access_token))
  }

  deleteEmpresa(idEmpresa:number,access_token){
    let direccion=url+"/"+idEmpresa;
    this.httpService.delete<Empresa>(direccion,this.getRequestHeaders(access_token)).subscribe(data => alert("Empresa Eliminada"));
  }
  
}
