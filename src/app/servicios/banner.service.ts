import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseBanner, Banner} from '../interfaces/interface.banner';

const url = environment.direccionBanner;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private httpService: HttpClient) { }

  obtenerBanners(access_token){
    console.log(url);
    return this.httpService.get<responseBanner>(url,this.getRequestHeaders(access_token));
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }

  addBanner(banner: Banner,access_token) {
    try {
      this.httpService.post<Banner>(url, banner, this.getRequestHeaders(access_token)).subscribe(
        data => alert("Banner Ingresado Correctamente"),
        error => alert("No pudo ingresarse el banner")
      );
    } catch (error) {
      //poner un toast si eso hay en angular
      console.log(error);
    }
  }

  editBanner(){
    console.log("Editar Banner");
  }

  deleteBanner(){
    console.log("Eliminar Banner");
  }
  
}
