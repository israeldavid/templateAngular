import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responseTabs, Tab, TabXid } from '../interfaces/interface.tabs';

const url = environment.direccionTabs;

@Injectable({
    providedIn: 'root'
  })
  export class TabsService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerTabs(access_token){
      return this.httpService.get<responseTabs>(url,this.getRequestHeaders(access_token));
    }

    obtenerTabById(idTab:number,access_token){
      //let direccion=url+"/"+idTab;
      let direccion=url+"/ById/"+idTab;
      return this.httpService.get<TabXid>(direccion,this.getRequestHeaders(access_token));
    }
    
    getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + access_token,
        'Content-Type': 'application/json',
      });
      return { headers: headers };  
    }

    addTabs(tab: Tab, access_token){
      try {
        this.httpService.post<Tab>(url, tab, this.getRequestHeaders(access_token)).subscribe(
          data => alert("Tab agregado correctamente"),
          error => alert("No se pudo agregar el Tab")
        );
      } catch (error) {
        console.log(error);
      }
    }

    editTabs(tab: Tab, access_token){
      try {
        this.httpService.put<Tab>(url, tab, this.getRequestHeaders(access_token)).subscribe(
          data => alert("Tab Actualizado Correctamente"),
          error => alert("No se pudo actualizar el Tab")
        );
      } catch (error) {
        console.log(error);
      }
    }
  
    deleteTabs(idTab:number,access_token){
      let direccion=url+"/"+idTab;
      this.httpService.delete<Tab>(direccion,this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Tab Eliminado Correctamente"),
        error => alert("Tab no pudo ser eliminado, Error de proceso")
      );
    }
  }