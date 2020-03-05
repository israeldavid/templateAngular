import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Rol } from '../../interfaces/interface.roles';
import { RolesService } from 'app/servicios/roles.service';

@Component({
  selector: 'app-crearrol',
  templateUrl: './crearrol.component.html',
  styleUrls: ['./crearrol.component.scss']
})
export class CrearrolComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token:any;
  crearRol:Rol = {idEmpresa:1,idAplicacion:1,nombre:'',estado:''};
  valorFormulario: any;

  constructor(private es:EmpresaService,
    private as:AplicacionService,private formBuilder: FormBuilder,
    private router:Router,
    private rs:RolesService) { 
      this.formGroup = formBuilder.group({
        empresa: ['1'],
        aplicacion:['1'],
        nombreRol: ['',Validators.required],
        estado:['A']
      });
    }

  ngOnInit() {
    this.consultarEmpresas();
    this.token=localStorage.getItem('token');
  }

  consultarEmpresas(){
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
    });
  }

  cambioSeleccionado(event){
    const IdEmpresa = event.target.value;
    this.as.obtenerAplicacionByEmpresa(IdEmpresa,this.token).subscribe(data => { 
      this.responseAplicacion=data;  
    });
  }

  cerrar(){
    this.router.navigateByUrl("admin/(roles)");
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearRol.idEmpresa=this.valorFormulario.empresa;
      this.crearRol.idAplicacion=this.valorFormulario.aplicacion;
      this.crearRol.nombre=this.valorFormulario.nombreRol;
      this.crearRol.estado=this.valorFormulario.estado;
      this.rs.addRol(this.crearRol, this.token);
      this.router.navigateByUrl("admin/(roles)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }
}
