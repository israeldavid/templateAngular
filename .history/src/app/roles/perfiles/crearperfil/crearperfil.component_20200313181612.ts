import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmpresaService } from '../../../servicios/empresa.service';
import { AplicacionService } from '../../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../../interfaces/interface.aplicacion';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { RolesService } from '../../../servicios/roles.service';
import { responseRoles } from '../../../interfaces/interface.roles';
import { menusService } from '../../../servicios/menus.services';
import { responseMenu } from '../../../interfaces/interface.menu';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { responsePermisos,Permiso} from '../../../interfaces/interface.permiso';
import { PermisosService } from '../../../servicios/permisos.service';
import { TabsService } from 'app/servicios/tabs.service';

@Component({
  selector: 'app-crearperfil',
  templateUrl: './crearperfil.component.html',
  styleUrls: ['./crearperfil.component.scss']
})
export class CrearperfilComponent implements OnInit {
  responseRoles: responseRoles;
  responseMenus: responseMenu;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  opciones:any;
  token:any;
  crearPerfil:Permiso = {idEmpresa:1,idAplicacion:1,nombre:'',estado:'',idRol:0,idMenu:0};
  valorFormulario: any;

  public formGroup: FormGroup;
  constructor(private _location:Location,
              private es:EmpresaService,
              private as:AplicacionService,
              private rs:RolesService,
              private ms:menusService,
              private ts:TabsService,
              private router:Router,
              private ps:PermisosService,
              private SpinnerService: NgxSpinnerService,
              private formBuilder: FormBuilder) { 
                this.formGroup = formBuilder.group({
                  empresa: ['1'],
                  aplicacion:['1'],
                  rol:['1'],
                  menu:['1'],
                  estado:['A']
                });
              }

  ngOnInit() {
    this.consultarEmpresas();
    this.consultarRoles();
    this.consultarMenus();
    this.consultarTabs();
  }

  regresar(){
    this._location.back();
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

  consultarRoles(){
    this.SpinnerService.show();
    this.rs.obtenerRoles(localStorage.getItem('token')).subscribe(data => { 
      this.responseRoles=data;  
      this.SpinnerService.hide();      
    });
  }

  consultarMenus(){
    this.token=localStorage.getItem('token');
    this.SpinnerService.show();
    this.ms.obtenerMenus(this.token).subscribe(data => { 
      this.opciones.push(data.menus.id,data.menus.nombre); 
      this.SpinnerService.hide(); 
    });
  }

  consultarTabs(){
    this.SpinnerService.show();
    this.ts.obtenerTabs(this.token).subscribe(data => { 
      this.opciones.concat(data.tabs); 
      this.SpinnerService.hide(); 
    });
  }

  cerrar(){
    this.router.navigateByUrl("admin/(roles)");
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearPerfil.idEmpresa=this.valorFormulario.empresa;
      this.crearPerfil.idAplicacion=this.valorFormulario.aplicacion;
      this.crearPerfil.nombre=this.valorFormulario.nombrePerfil;
      this.crearPerfil.estado=this.valorFormulario.estado;
      this.crearPerfil.idRol=this.valorFormulario.rol;
      this.crearPerfil.idMenu=this.valorFormulario.menu;
      this.ps.addPermiso(this.crearPerfil, this.token);
      this.router.navigateByUrl("admin/(roles)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

}
