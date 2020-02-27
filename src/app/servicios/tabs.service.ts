import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responseTabs } from '../interfaces/interface.tabs';

const url = environment.direccionTabs;

@Injectable({
    providedIn: 'root'
  })
  export class TabsService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerTabs(access_token){
      return this.httpService.get<responseTabs>(url,this.getRequestHeaders(access_token));
    }
    
    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      });
      return { headers: headers };  
    }

    addTabs(){
      
    }
  }