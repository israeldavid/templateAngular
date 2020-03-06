import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Theme,responseTheme,ThemeXid } from 'app/interfaces/interface.theme';

const url = environment.direccionTheme;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private httpService: HttpClient) { }

  obtenerTheme(access_token){
    return this.httpService.get<responseTheme>(url, this.getRequestHeaders(access_token));
  }

  obtenerThemeById(idTheme:number,access_token){
    let direccion=url+"/"+idTheme;
    return this.httpService.get<ThemeXid>(direccion);
  }

  obtenerThemesByAplicacion(idApp:number,access_token){
    let direccion=url+"/ByAplicacion/"+idApp;
    return this.httpService.get<responseTheme>(direccion, this.getRequestHeaders(access_token));
  }

  addTheme(theme: Theme, access_token){
    try {
        console.log(theme);
        //this.httpService.post<Theme>(url, theme, this.getRequestHeaders(access_token)).subscribe(
        //  data => alert("Theme creado correctamente"),
        //  error => alert("Theme no se pudo crear")
        //)
        return this.httpService.post(url, theme);
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

    editTheme(theme:Theme,access_token){
        try {
            this.httpService.put<Theme>(url, theme, this.getRequestHeaders(access_token)).subscribe(
              data => alert("Theme Actualizado Correctamente"),
              error => alert("No se pudo actualizar el Theme")
            );
          } catch (error) {
            console.log(error);
          }
    }

    deleteTheme(idtheme:number,access_token){
      let direccion=url+"/"+idtheme;
      this.httpService.delete<Theme>(direccion,this.getRequestHeaders(access_token))
      .subscribe(
        data  => alert("Theme Eliminado Correctamente"),
        error => alert("Theme no pudo ser eliminado, Error de proceso")
      );
    }


}