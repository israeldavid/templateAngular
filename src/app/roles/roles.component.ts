import { Component, OnInit } from '@angular/core';
import { RolesService } from '../servicios/roles.service';
import { responseRoles } from '../interfaces/interface.roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  responseRoles: responseRoles;
  constructor(private rs:RolesService,private router:Router) { }

  ngOnInit() {
    this.consultarRoles();
  }

  consultarRoles(){
    this.rs.obtenerRoles().subscribe(data => { 
      this.responseRoles=data;        
    });
  }

  nuevorol(){
    this.router.navigateByUrl("crearrol");
  }

  editarrol(idrol:number){
    this.router.navigateByUrl("editarrol/"+idrol)
  }

  eliminarrol(idrol:number){

  }
}
