import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responseGrupos, Grupo, MetricsNotification } from '../interfaces/interface.grupo';

const url = environment.direccionGrupos;
const urldos = environment.direccionMetricas;

@Injectable({
    providedIn: 'root'
  })
  export class GruposService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerGrupos(access_token){
      return this.httpService.get<responseGrupos>(url,this.getRequestHeaders(access_token));
    }

    obtenerGrupoById(idGrupo:number,access_token){
      let direccion=url + "/" + idGrupo;
      //return this.httpService.get<TabXid>(direccion,this.getRequestHeaders(access_token));
    }
    
    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      });
      return { headers: headers };  
    }

    addGrupo(grupo: Grupo, access_token){
      try {
        this.httpService.post<Grupo>(url, grupo, this.getRequestHeaders(access_token)).subscribe(
          data => alert("Grupo agregado correctamente"),
          error => alert("No se pudo agregar el grupo")
        );
      } catch (error) {
        console.log(error);
      }
    }

    visualizarDatos(idgrupo: number, access_token){
      const direccions = urldos + '/' + idgrupo;
        return this.httpService.get<MetricsNotification>(direccions, this.getRequestHeaders(access_token));
    }

  }