import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { responseTabs } from '../interfaces/interface.tabs';

const url = environment.direccionTabs;

@Injectable({
    providedIn: 'root'
  })
  export class TabsService {
  
    constructor(private httpService: HttpClient) { }
  
    obtenerTabs(){
      return this.httpService.get<responseTabs>(url);
    }
    
  }