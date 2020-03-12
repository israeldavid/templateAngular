import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { mensajeFCM } from '../interfaces/interface.fcm';

const url = environment.direccionEnvioFCM;

@Injectable({
    providedIn: 'root'
})
export class NotificacionesService {

    constructor(private httpService: HttpClient) { }

    envioFCM(mensaje:mensajeFCM){
        console.log("Cuerpo mensaje:",mensaje);
        this.httpService.post<mensajeFCM>(url, mensaje).subscribe(
        data => alert("Mensaje enviado correctamente"),
        error => alert(JSON.stringify(error.headers))
        
      );
    }

}