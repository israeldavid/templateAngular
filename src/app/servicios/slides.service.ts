import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseSlides,Slider,SliderXid } from '../interfaces/interface.slides';

const url = environment.direccionSlides;

@Injectable({
  providedIn: 'root'
})
export class slidesService {

  constructor(private httpService: HttpClient) { }

  obtenerSliders(){
    return this.httpService.get<responseSlides>(url);
  }

  obtenerSliderById(idSlider:number,access_token){
    let direccion=url+"/"+idSlider;
    console.log(direccion);
    return this.httpService.get<SliderXid>(direccion,this.getRequestHeaders(access_token));
  }

  addSlider(slider: Slider,access_token){
    try {
      this.httpService.post<Slider>(url, slider, this.getRequestHeaders(access_token)).subscribe(
        data => alert ('Slider ingresado correctamente'),
        error => alert("Error al ingresar el Slider")
      );
    } catch (error) {
      console.log(error);
    }
  }

  editSlider(slide: Slider,access_token){
    try {
      console.log(slide);
      this.httpService.put<Slider>(url, slide, this.getRequestHeaders(access_token)).subscribe(
        data => alert("Slider Actualizado Correctamente"),
        error => alert("No se pudo actualizar el Slider")
      );
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

  deleteSlide(idSlides:number){
    let direccion=url+"/"+idSlides;
    this.httpService.delete<Slider>(direccion)
    .subscribe(
      data  => alert("Slider Eliminado Correctamente"),
      error => alert("Slider no pudo ser eliminado, Error de proceso")
    );
  }
}
