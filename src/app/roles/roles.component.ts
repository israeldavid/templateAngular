import { Component, OnInit } from '@angular/core';
import { RolesService } from '../servicios/roles.service';
import { responseRoles } from '../interfaces/interface.roles';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  responseRoles: responseRoles;

  constructor(private rs:RolesService,private router:Router,private SpinnerService: NgxSpinnerService) {
    
   }

  ngOnInit() {
    this.consultarRoles();
  }

  consultarRoles(){
    this.SpinnerService.show();
    this.rs.obtenerRoles().subscribe(data => { 
      this.responseRoles=data;  
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
    this.rs.deleteRol(idrol,localStorage.getItem('token'));
    this.router.navigateByUrl("admin/(roles)")
  }
}
