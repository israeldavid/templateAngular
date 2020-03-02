import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseEmpresa, Empresa} from '../interfaces/interface.empresa';

const url = environment.direccionEmpresa;

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpService: HttpClient) { }

  obtenerEmpresas(access_token){
    return this.httpService.get<responseEmpresa>(url,this.getRequestHeaders(access_token));
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addEmpresa(empresa: Empresa,access_token) {
    try {
      console.log(empresa,access_token);
      return this.httpService.post<Empresa>(url, this.getRequestHeaders(access_token));
    } catch (error) {
      console.log(error);
    }
  }

  editEmpresa(){
    console.log("Editar Empresa");
  }

  deleteEmpresa(){
    console.log("Eliminar Empresa");
  }
  
}
