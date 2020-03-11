import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responsePermisos,Permiso,PermisoxId} from '../interfaces/interface.permiso';

const url = environment.direccionPermisos;

@Injectable({
    providedIn: 'root'
})
export class PermisosService {

    constructor(private httpService: HttpClient) { }

    obtenerPermisos(access_token){
        return this.httpService.get<responsePermisos>(url,this.getRequestHeaders(access_token));
    }

    obtenerPermisoById(idPermiso:number,access_token){
        let direccion=url+"/"+idPermiso;
        return this.httpService.get<PermisoxId>(direccion,this.getRequestHeaders(access_token));
    }

    addPermiso(permiso:Permiso,access_token){
        try {
            this.httpService.post<Permiso>(url, permiso, this.getRequestHeaders(access_token)).subscribe(
              data => alert("Permiso creado correctamente"),
              error => alert("Permiso no se pudo crear")
            )
          } catch (error) {
            console.log(error);
          }
    }

    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json',
        });
        return { headers: headers };  
    }

    editpermiso(permiso:Permiso,access_token){
        try {
            this.httpService.put<Permiso>(url, permiso, this.getRequestHeaders(access_token)).subscribe(
              data => alert("Permiso Actualizado Correctamente"),
              error => alert("No se pudo actualizar el Permiso")
            );
          } catch (error) {
            console.log(error);
          }
    }

    deletePermiso(idpermiso:number,access_token){
      let direccion=url+"/"+idpermiso;
      this.httpService.delete<Permiso>(direccion,this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Permiso Eliminado Correctamente"),
        error => alert("Permiso no pudo ser eliminado, Error de proceso")
      );
    }

}