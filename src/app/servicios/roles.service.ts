import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseRoles, Rol,RolxId } from '../interfaces/interface.roles';

const url = environment.direccionRoles;

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private httpService: HttpClient) { }

    obtenerRoles(access_token){
        return this.httpService.get<responseRoles>(url,this.getRequestHeaders(access_token));
    }

    obtenerRolById(idRol:number,access_token){
        let direccion=url+"/"+idRol;
        return this.httpService.get<RolxId>(direccion,this.getRequestHeaders(access_token));
    }

    addRol(rol:Rol,access_token){
        try {
            this.httpService.post<Rol>(url, rol, this.getRequestHeaders(access_token)).subscribe(
              data => alert("Rol creado correctamente"),
              error => alert("Rol no se pudo crear")
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

    editrol(rol:Rol,access_token){
        try {
            this.httpService.put<Rol>(url, rol, this.getRequestHeaders(access_token)).subscribe(
              data => alert("Rol fue actualizado Correctamente"),
              error => alert("No se pudo actualizar el Rol")
            );
          } catch (error) {
            console.log(error);
          }
    }

    deleteRol(idrol:number,access_token){
      let direccion=url+"/"+idrol;
      this.httpService.delete<Rol>(direccion,this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Rol Eliminado Correctamente"),
        error => alert("Rol no pudo ser eliminado, Error de proceso")
      );
    }

}