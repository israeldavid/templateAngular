import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { menusService } from '../../servicios/menus.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseMenu, Menu, MenuXid } from '../../interfaces/interface.menu';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarmenus',
  templateUrl: './editarmenus.component.html',
  styleUrls: ['./editarmenus.component.scss']
})
export class EditarmenusComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Menu = {idEmpresa: 0, idAplicacion: 0,id:0, nombre:'',base64: '',estado:'',urlPage:'' }
  menuMostrar: MenuXid;
  menuId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgUrl:any;
  imgMostrar:string;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, 
    private ms: menusService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router,
    private _location: Location) { 
      this.formGroup = formBuilder.group({
        empresa: [{value: '1', disabled: true}],
        aplicacion: [{value: '1', disabled: true}],
        nombreOpcion: ['',Validators.required],
        archivo: ['',],
        nombreEnlace: ['',Validators.required],
        estado:['A']
      });
    }

  ngOnInit() {
    this.menuId = {
      id: this.rutaActiva.snapshot.params.idmenu
    }
    this.consultarEmpresas();
    
    //Obtiene los datos para cargar en el formulario
    this.ms.obtenerMenuById(this.menuId.id, this.obtenerToken()).subscribe(
      data => {
        this.menuMostrar = data;
        this.cargarAplicaciones(this.menuMostrar.menu.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.menuMostrar.menu.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.menuMostrar.menu.idAplicacion);
        this.formGroup.controls['nombreOpcion'].setValue(this.menuMostrar.menu.nombre);
        this.imgMostrar='data:image/png;base64,' + this.menuMostrar.menu.base64;
        this.formGroup.controls['nombreEnlace'].setValue(this.menuMostrar.menu.urlPage);
        this.imgUrl=this.menuMostrar.menu.base64;
        this.formGroup.controls['estado'].setValue(this.menuMostrar.menu.estado);
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

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.imgUrl = btoa(e.target.result);
    //this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.base64textString.push(btoa(e.target.result));
  }

  cerrar() {
    this.route.navigateByUrl("admin/(menus)");
  }

  regresar(){
    this._location.back();
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id=this.menuId.id;
      this.objetoActualizar.idEmpresa=this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion=this.valorFormulario.aplicacion;
      this.objetoActualizar.base64=this.imgUrl
      //this.base64textString[0]; este es para mostrar de pronto en el edit va a funcionar
      this.objetoActualizar.nombre=this.valorFormulario.nombreOpcion;
      this.objetoActualizar.urlPage=this.valorFormulario.nombreEnlace;
      this.objetoActualizar.estado=this.valorFormulario.estado;
      this.ms.editMenu(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(menus)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

}
