import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseBanner} from '../interfaces/interface.banner';

const url = environment.direccionBanner;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private httpService: HttpClient) { }

  obtenerBanners(){
    return this.httpService.get<responseBanner>(url);
  }
  
}
