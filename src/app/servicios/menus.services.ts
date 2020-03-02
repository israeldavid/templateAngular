import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseMenu, Menu} from '../interfaces/interface.menu';
const url = environment.direccionMenu;

@Injectable({
  providedIn: 'root'
})
export class menusService {

  constructor(private httpService: HttpClient) { }

  obtenerMenus(access_token){
    return this.httpService.get<responseMenu>(url,this.getRequestHeaders(access_token));
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
      console.log(menu,access_token);
      return this.httpService.post<Menu>(url, this.getRequestHeaders(access_token));
    } catch (error) {
      console.log(error);
    }
  }

  editMenu(){
    console.log("Editar Menu...")
  }

  deleteMenu(){
    console.log("Eliminar Menu...")
  }
}
