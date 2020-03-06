import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolesService } from '../../../servicios/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol, RolxId } from '../../../interfaces/interface.roles';
import { EmpresaService } from '../../../servicios/empresa.service';
import { AplicacionService } from '../../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../../interfaces/interface.aplicacion';
import { responsePermisos,Permiso,PermisoxId} from '../../../interfaces/interface.permiso';
import { PermisosService } from '../../../servicios/permisos.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.scss']
})
export class EditarperfilComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Permiso = {id:0, idEmpresa:1,idAplicacion:1,nombre:'',estado:'',idRol:0,idMenu:0};
  perfilMostrar: PermisoxId;
  perfilId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;

  constructor(private rutaActiva: ActivatedRoute, private rs: RolesService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router,
    private ps:PermisosService,
    private _location: Location) { 
      this.formGroup = formBuilder.group({
        empresa: ['1'],
        aplicacion:['1'],
        nombrePerfil: ['',Validators.required],
        rol:['1'],
        menu:['1'],
        estado:['A']
      });
    }

  ngOnInit() {
    this.perfilId = {
      id: this.rutaActiva.snapshot.params.idperfil
    }
    //consultar las empresas
    this.consultarEmpresas();
    //consultar las aplicaciones

    //Obtiene los datos para cargar en el formulario
    
    this.ps.obtenerPermisoById(this.perfilId.id, this.obtenerToken()).subscribe(
      data => {
        this.perfilMostrar = data;
        //this.cargarAplicaciones(this.perfilMostrar.permiso.idEmpresa);
        //this.formGroup.controls['empresa'].setValue(this.perfilMostrar.permiso.idEmpresa);
        //this.formGroup.controls['aplicacion'].setValue(this.perfilMostrar.permiso.idAplicacion);
        this.formGroup.controls['nombrePerfil'].setValue(this.perfilMostrar.permiso.nombre);
        //this.formGroup.controls['rol'].setValue(this.perfilMostrar.permiso.idRol);
        //this.formGroup.controls['menu'].setValue(this.perfilMostrar.permiso.idMenu);
        this.formGroup.controls['estado'].setValue(this.perfilMostrar.permiso.estado);
      }, error => {
        console.log(error);
      }
    );
  }

  consultarEmpresas() {
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      this.responseEmpresa = data;
    });
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.cargarAplicaciones(IdEmpresa);
  }

  cargarAplicaciones(IdEmpresa:number){
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
    });
  }

  obtenerToken() {
    return this.token = localStorage.getItem('token');
  } 

  cerrar() {
    this.route.navigateByUrl("admin/(roles)");
  }

  regresar(){
    this._location.back();
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id = this.perfilId.id;
      this.objetoActualizar.nombre = this.valorFormulario.nombrePerfil;
      this.objetoActualizar.estado = this.valorFormulario.estado;
      this.ps.editpermiso(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(roles)");
    }
    else {
      alert("Llena los campos necesarios");
    }
  }
}
