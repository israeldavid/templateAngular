import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseSlides,Slider } from '../interfaces/interface.slides';

const url = environment.direccionSlides;

@Injectable({
  providedIn: 'root'
})
export class slidesService {

  constructor(private httpService: HttpClient) { }

  obtenerSliders(){
    return this.httpService.get<responseSlides>(url);
  }

  addSlider(slider: Slider,access_token){
    try {
      console.log(slider,access_token);
      return this.httpService.post<Slider>(url, this.getRequestHeaders(access_token));
    } catch (error) {
      console.log(error);
    }
  }

  getRequestHeaders(access_token:string): { headers: HttpHeaders | { [header: string]: string | string[] }; } {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    });
    return { headers: headers };  
  }
  
  editSlide(){
    console.log("Editar Slide...")
  }

  deleteSlide(){
    console.log("Eliminar Slide...")
  }
}
