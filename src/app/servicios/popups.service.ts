import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responsePopups,Popups, PopupxId } from '../interfaces/interface.popup';

const url = environment.direccionPopups;

@Injectable({
    providedIn: 'root'
  })
  export class PopupsService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerPopup(access_token){
      return this.httpService.get<responsePopups>(url,this.getRequestHeaders(access_token));
    }

    obtenerPopupById(idpopup:number,access_token){
      //let direccion=url+"/"+idpopup;
      let direccion=url+"/ById/"+idpopup;
      return this.httpService.get<PopupxId>(direccion,this.getRequestHeaders(access_token));
    }
    
    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      });
      return { headers: headers };  
    }

    addPopups(popup: Popups,access_token){
      try {
        
        this.httpService.post<Popups>(url, popup, this.getRequestHeaders(access_token)).subscribe(
          data => alert("Popup creado correctamente"),
          error => alert("Popup no se pudo crear")
        )
      } catch (error) {
        console.log(error);
      }
    }

    editPopup(popup: Popups,access_token){     
      try {
        this.httpService.put<Popups>(url, popup, this.getRequestHeaders(access_token)).subscribe(
          data => alert("Popups Actualizado Correctamente"),
          error => alert("No se pudo actualizar el Popups")
        );
      } catch (error) {
        console.log(error);
      }
    }
  
    deletePopUp(idpopup:number,access_token){
      let direccion=url+"/"+idpopup;
      this.httpService.delete<Popups>(direccion,this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Popups Eliminado Correctamente"),
        error => alert("Popups no pudo ser eliminado, Error de proceso")
      );
    }
  }