import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseBanner} from '../interfaces/interface.banner';

const url = environment.direccionBanner;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private httpService: HttpClient) { }

  obtenerBanners(access_token){
    //return this.httpService.get<responseBanner>(url);
    return this.httpService.get<responseBanner>(url,this.getRequestHeaders(access_token));
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addBanner(banner: responseBanner) {
    try {
      return this.httpService.post<responseBanner>(url, banner);
    } catch (error) {
      //poner un toast si eso hay en angular
      console.log(error);
    }
  }
  
}
