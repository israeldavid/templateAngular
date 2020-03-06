import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { menusService } from '../../servicios/menus.services';
import { responseMenu, Menu} from '../../interfaces/interface.menu';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-crearmenus',
  templateUrl: './crearmenus.component.html',
  styleUrls: ['./crearmenus.component.scss']
})
export class CrearmenusComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token:any;
  base64textString = [];
  crearMenu:Menu = {idEmpresa:1,idAplicacion:1,nombre:'',base64: '',urlPage:'',estado:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder: FormBuilder,
    private ms:menusService,
    private es:EmpresaService,
    private as:AplicacionService,
    private _location: Location) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreOpcion: ['',Validators.required],
      archivo: ['',Validators.required],
      nombreEnlace: ['',Validators.required],
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
    this.route.navigateByUrl("admin/(menus)");
  }

  regresar(){
    this._location.back();
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
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearMenu.idEmpresa=this.valorFormulario.empresa;
      this.crearMenu.idAplicacion=this.valorFormulario.aplicacion;
      this.crearMenu.base64=this.imgUrl
      this.crearMenu.nombre=this.valorFormulario.nombreOpcion;
      this.crearMenu.urlPage=this.valorFormulario.nombreEnlace;
      this.crearMenu.estado=this.valorFormulario.estado;
      this.ms.addMenu(this.crearMenu, this.obtenerToken());
      this.route.navigateByUrl("admin/(menus)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
