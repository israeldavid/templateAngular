import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RolesService } from '../../servicios/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rol, RolxId } from '../../interfaces/interface.roles';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarrol',
  templateUrl: './editarrol.component.html',
  styleUrls: ['./editarrol.component.scss']
})
export class EditarrolComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Rol = { id: 0, nombre: '', estado: '', idEmpresa: 0, idAplicacion: 0 }
  rolMostrar: RolxId;
  rolId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;

  constructor(private rutaActiva: ActivatedRoute, private rs: RolesService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router) { 
      this.formGroup = formBuilder.group({
        empresa: ['1'],
        aplicacion: ['1'],
        nombreRol: ['', Validators.required],
        estado: ['A']
      });

    }

  ngOnInit() {
    this.rolId = {
      id: this.rutaActiva.snapshot.params.idBanner
    }
    //consultar las empresas
    this.consultarEmpresas();
    //consultar las aplicaciones

    //Obtiene los datos para cargar en el formulario
    this.rs.obtenerRolById(this.rolId.id, this.obtenerToken()).subscribe(
      data => {
        this.rolMostrar = data;
        this.cargarAplicaciones(this.rolMostrar.rol.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.rolMostrar.rol.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.rolMostrar.rol.idAplicacion);
        this.formGroup.controls['nombreRol'].setValue(this.rolMostrar.rol.nombre);
        this.formGroup.controls['estado'].setValue(this.rolMostrar.rol.estado);
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

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id = this.rolId.id;
      this.objetoActualizar.nombre = this.valorFormulario.nombreRol;
      this.objetoActualizar.idEmpresa = this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion = this.valorFormulario.aplicacion;
      this.objetoActualizar.estado = this.valorFormulario.estado;
      this.rs.editrol(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(roles)");
    }
    else {
      alert("Llena los campos necesarios");
    }
  }
}
