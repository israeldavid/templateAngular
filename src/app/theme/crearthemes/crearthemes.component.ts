import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ColorEvent } from 'ngx-color';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';
import { Theme } from '../../interfaces/interface.theme';
import { ThemeService } from 'app/servicios/theme.service';

@Component({
  selector: 'app-crearthemes',
  templateUrl: './crearthemes.component.html',
  styleUrls: ['./crearthemes.component.scss']
})
export class CrearthemesComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token:any;
  crearTheme:Theme = {nombre:'',descripcion:'',idEmpresa:1,idAplicacion:1,estado:''};
  valorFormulario: any;

  //variable para controlar la visualización del color picker
  pickerShowTab: boolean = false;
  pickerShowMenu: boolean = false;
  pickerShowBoton: boolean = false;
  pickerShowAlertSuccess: boolean = false;
  pickerShowAlertDanger: boolean = false;
  pickerShowAlertWarning: boolean = false;

  actualColorTab = "#5F5F2B";
  actualColorMenu = "#952f8d";
  actualColorBoton = "#0d2ec9";
  actualColorAlertSuccess = "#12a4d8";
  actualColorAlertDanger = "#ff0002";
  actualColorAlertWarning = "#ff0002";

  constructor(private route:Router,private formBuilder: FormBuilder,
    private es:EmpresaService,
    private as:AplicacionService,
    private _location:Location,private ts:ThemeService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      colorTab: [ Validators.required],
      colorMenu: [ Validators.required],
      colorBoton: [ Validators.required],
      colorAlertSuccess: [ Validators.required],
      colorAlertWarning: [ Validators.required],
      colorAlertDanger: [ Validators.required],
      estado:['A']
    });
   }

  ngOnInit() {
    this.consultarEmpresas();
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
    this.route.navigateByUrl("admin/(theme");
  }

  regresar(){
    this._location.back();
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;

      let obj1: Theme = {
        nombre: "--ion-color-primary",
        descripcion: this.actualColorTab,
        idEmpresa: this.valorFormulario.Empresa,
        idAplicacion: this.valorFormulario.Aplicacion,
        estado:"A"
      }

      let obj2: Theme  = {
        nombre: "--ion-color-secondary",
        descripcion: this.actualColorMenu,
        idEmpresa: this.valorFormulario.Empresa,
        idAplicacion: this.valorFormulario.Aplicacion,
        estado:"A"
      }
  
      let obj3: Theme = {
        nombre: "--ion-color-tertiary",
        descripcion: this.actualColorBoton,
        idEmpresa: this.valorFormulario.Empresa,
        idAplicacion: this.valorFormulario.Aplicacion,
        estado:"A"
      }
  
      let obj4: Theme = {
        nombre: "--ion-color-success",
        descripcion: this.actualColorAlertSuccess,
        idEmpresa: this.valorFormulario.Empresa,
        idAplicacion: this.valorFormulario.Aplicacion,
        estado:"A"
      }
  
      let obj5: Theme = {
        nombre: "--ion-color-warning",
        descripcion: this.actualColorAlertDanger,
        idEmpresa: this.valorFormulario.Empresa,
        idAplicacion: this.valorFormulario.Aplicacion,
        estado:"A"
      }

      let array = [obj1,obj2,obj3,obj4,obj5];
      console.log(array);
      
      for(let i = 0; i < array.length; i++){
  
        this.ts.addTheme(array[i], this.obtenerToken()).subscribe(response => {
          alert("Tema Ingresado Correctamente");
        }, error => {
          console.log("error en component: ", error);
        });
      }
      //this.crearTheme.idEmpresa=this.valorFormulario.empresa;
      this.crearTheme.idAplicacion=this.valorFormulario.aplicacion;
      this.crearTheme.nombre=this.valorFormulario.nombretheme;
      this.crearTheme.descripcion=this.valorFormulario.descripciontheme;
      this.crearTheme.estado=this.valorFormulario.estado;
      this.ts.addTheme(this.crearTheme, this.obtenerToken());
      this.route.navigateByUrl("admin/(theme)");
    }
    else{
      alert("Llena los campos necesarios")
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

  toggleColorPickerTab() {
    this.pickerShowTab = !this.pickerShowTab;
  }

  toggleColorPickerMenu() {
    this.pickerShowMenu = !this.pickerShowMenu;
  }

  toggleColorPickerBoton() {
    this.pickerShowBoton = !this.pickerShowBoton;
  }

  toggleColorPickerAlertSuccess() {
    this.pickerShowAlertSuccess = !this.pickerShowAlertSuccess;
  }

  toggleColorPickerAlertWarning() {
    this.pickerShowAlertWarning = !this.pickerShowAlertWarning;
  }

  toggleColorPickerAlertDanger() {
    this.pickerShowAlertDanger = !this.pickerShowAlertDanger;
  }

  //Maneja el cambio de color en cada paleta
  handleChangeColorTab($event: ColorEvent) {
    this.actualColorTab = $event.color['hex'];
  }

  handleChangeColorMenu($event: ColorEvent) {
    this.actualColorMenu = $event.color['hex'];
  }

  handleChangeColorBoton($event: ColorEvent) {
    this.actualColorBoton = $event.color['hex'];
  }

  handleChangeColorAlertSuccess($event: ColorEvent) {
    this.actualColorAlertSuccess = $event.color['hex'];
  }

  handleChangeColorAlertWarning($event: ColorEvent) {
    this.actualColorAlertWarning = $event.color['hex'];
  }

  handleChangeColorAlertDanger($event: ColorEvent) {
    this.actualColorAlertDanger = $event.color['hex'];
  }
}
