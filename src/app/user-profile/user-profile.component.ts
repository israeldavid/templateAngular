import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../servicios/empresa.service';
import { responseEmpresa,Empresa } from '../interfaces/interface.empresa';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  responseEmpresa: responseEmpresa;
  token:any;

  constructor(private route:Router,private es:EmpresaService) { }

  ngOnInit() {
    this.consultarEmpresas();
  }

  consultarEmpresas(){
    this.token=localStorage.getItem('token');
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
    });
  }

  crearEmpresa(){
    this.route.navigateByUrl("crearempresa");
  }

  eliminarEmpresa(idEmpresa:number){
    this.es.deleteEmpresa(idEmpresa,this.token=localStorage.getItem('token'));
    alert("Empresa Eliminada Correctamente");
    this.route.navigateByUrl("admin/(user-profile)");
  }

  editarEmpresa(idEmpresa:number){
    this.route.navigateByUrl("editarempresa/"+idEmpresa)
  }
}
