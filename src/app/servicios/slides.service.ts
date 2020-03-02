import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseSlides } from '../interfaces/interface.slides';

const url = environment.direccionSlides;

@Injectable({
  providedIn: 'root'
})
export class slidesService {

  constructor(private httpService: HttpClient) { }

  obtenerSliders(){
    return this.httpService.get<responseSlides>(url);
  }
  
  editSlide(){
    console.log("Editar Slide...")
  }

  deleteSlide(){
    console.log("Eliminar Slide...")
  }
}
