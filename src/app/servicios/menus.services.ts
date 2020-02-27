import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseMenu} from '../interfaces/interface.menu';
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
}
