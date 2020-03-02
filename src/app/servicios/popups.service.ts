import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responsePopups } from '../interfaces/interface.popup';

const url = environment.direccionPopups;

@Injectable({
    providedIn: 'root'
  })
  export class PopupsService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerPopup(access_token){
      return this.httpService.get<responsePopups>(url,this.getRequestHeaders(access_token));
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

    editPopUp(){
      console.log("Editar Popup...")
    }
  
    deletePopUp(){
      console.log("Eliminar Popup...")
    }
  }