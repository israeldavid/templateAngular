import { Component, OnInit } from '@angular/core';
import { RolesService } from '../servicios/roles.service';
import { responseRoles } from '../interfaces/interface.roles';
import { responsePermisos,Permiso} from '../interfaces/interface.permiso';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PermisosService } from '../servicios/permisos.service';
import { timeout } from 'q';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  responseRoles: responseRoles;
  responsePermisos: responsePermisos;
  token: any;
  constructor(private rs: RolesService,
              private router: Router,
              private SpinnerService: NgxSpinnerService,
              private ps: PermisosService) {
   }

  ngOnInit() {
    this.consultarRoles();
    this.consultarPermisos();
  }

  consultarRoles(){  
    this.SpinnerService.show();
    this.rs.obtenerRoles(localStorage.getItem('token')).subscribe(data => { 
      this.responseRoles=data;  
      this.SpinnerService.hide(); 
    }, err => {
      this.SpinnerService.hide();      
    });
  }

  consultarPermisos(){
    this.SpinnerService.show();
    this.ps.obtenerPermisos(localStorage.getItem('token')).subscribe(data => { 
      this.responsePermisos=data;  
      this.SpinnerService.hide();  
    }, err => {
      this.SpinnerService.hide();
    });
  }

  nuevorol(){
    this.router.navigateByUrl("crearrol");
  }

  editarrol(idrol:number){
    this.router.navigateByUrl("editarrol/"+idrol)
  }

  eliminarrol(idrol:number){
    if(window.confirm('Estas seguro de eliminar ?')){
      this.rs.deleteRol(idrol,localStorage.getItem('token'));
      this.consultarRoles();
    } else {
      alert("Proceso cancelado");
    }
  }

  nuevopermiso(){
    this.router.navigateByUrl("crearperfil");
  }

  editarpermiso(idperfil:number){
    this.router.navigateByUrl("editarperfil/"+idperfil)
  }

  eliminarpermiso(idperfil:number){
    if(window.confirm('Estas seguro de eliminar ?')){
      this.ps.deletePermiso(idperfil,localStorage.getItem('token'));
      this.consultarPermisos();
    } else {
      alert("No se pudo eliminar el perfil");
    }
  }
}
