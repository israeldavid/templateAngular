import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseMenu} from '../interfaces/interface.menu';
const url = environment.direccionMenu;

@Injectable({
  providedIn: 'root'
})
export class menusService {

  constructor(private httpService: HttpClient) { }

  obtenerMenus(){
    return this.httpService.get<responseMenu>(url);
  }
}
