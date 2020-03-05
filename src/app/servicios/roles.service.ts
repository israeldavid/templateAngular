import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { responseRoles } from '../interfaces/interface.roles';

const url = environment.direccionRoles;

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private httpService: HttpClient) { }

    obtenerRoles(){
        return this.httpService.get<responseRoles>(url);
    }

}