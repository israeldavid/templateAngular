import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { User } from '../interfaces/interface.user';
import { AuthResponse } from  '../interfaces/interface.auth-response';

const url = environment.direccionLogin;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService: HttpClient) { }

  validarUsuario(postData:User){
    return this.httpService.post<AuthResponse>(url, postData);
  }
}