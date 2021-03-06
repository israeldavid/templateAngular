import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseMenu, Menu, MenuXid} from '../interfaces/interface.menu';
const url = environment.direccionMenu;

@Injectable({
  providedIn: 'root'
})
export class menusService {

  constructor(private httpService: HttpClient) { }

  obtenerMenus(access_token){
    return this.httpService.get<responseMenu>(url,this.getRequestHeaders(access_token));
  }

  obtenerMenuById(idMenu:number,access_token){
    //let direccion=url+"/"+idpopup;
    let direccion=url+"/ById/"+idMenu;
    return this.httpService.get<MenuXid>(direccion,this.getRequestHeaders(access_token));
  }

  

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addMenu(menu: Menu,access_token){
    try {
      this.httpService.post<Menu>(url, menu, this.getRequestHeaders(access_token)).subscribe(
        data => alert("Opcion ingresada correctamente"),
        error => alert("Opción no pudo ser ingresada")
      );
    } catch (error) {
      console.log(error);
    }
  }

  editMenu(menu: Menu,access_token){
    try {
      
      this.httpService.put<Menu>(url, menu, this.getRequestHeaders(access_token)).subscribe(
        data => alert("Menu Actualizado Correctamente"),
        error => alert("No se pudo actualizar el Menu")
      );
    } catch (error) {
      console.log(error);
    }
  }

  deleteMenu(idMenu:number,access_token){
    let direccion=url+"/"+idMenu;
    this.httpService.delete<Menu>(direccion,this.getRequestHeaders(access_token))
    .subscribe(
      data  => alert("Menu Eliminado Correctamente"),
      error => alert("Menu no pudo ser eliminado, Error de proceso")
    );
  }
}
