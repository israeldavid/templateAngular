import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ThemeService } from '../../servicios/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseTheme,Theme, ThemeXid } from '../../interfaces/interface.Theme';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-editartheme',
  templateUrl: './editartheme.component.html',
  styleUrls: ['./editartheme.component.scss']
})
export class EditarthemeComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Theme = { id: 0, nombre: '',descripcion:''}
  themeMostrar: ThemeXid;
  themeId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;

  pickerShowTab: boolean = false;
  actualColorTab = "";

  constructor(private route:Router,
              private rutaActiva: ActivatedRoute,
              private formBuilder: FormBuilder,
              private es:EmpresaService,
              private as:AplicacionService,
              private _location:Location,
              private ts:ThemeService) { 
      this.formGroup = formBuilder.group({
        nombre: ['', Validators.required],
        colortab: ['', Validators.required]
      });
    }
 
  ngOnInit() {
    this.themeId = {
      id: this.rutaActiva.snapshot.params.idtheme
    }

    this.consultarThemeXId(this.themeId.id);
  }

  consultarThemeXId(idtheme:number){
    this.ts.obtenerThemeById(idtheme,localStorage.getItem('token')).subscribe(
      data => {
        this.themeMostrar=data;
        this.formGroup.controls['nombre'].setValue(this.themeMostrar.tema.nombre);
        this.formGroup.controls['colortab'].setValue(this.themeMostrar.tema.descripcion);
        this.actualColorTab=this.themeMostrar.tema.descripcion;
      }, err => {
        console.log(err)
      });
  }

  regresar(){
    this._location.back();
  }

  cerrar(){
    this.route.navigateByUrl("admin/(theme)");
  }

  toggleColorPickerTab() {
    this.pickerShowTab = !this.pickerShowTab;
  }

  //Maneja el cambio de color en cada paleta
  handleChangeColorTab($event: ColorEvent) {
    this.actualColorTab = $event.color['hex'];
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id=this.themeId.id;
      this.objetoActualizar.nombre=this.valorFormulario.nombre;
      this.objetoActualizar.descripcion=this.actualColorTab;
      this.objetoActualizar.estado="A";
      this.ts.editTheme(this.objetoActualizar,localStorage.getItem('token'));
      this.consultarThemeXId(this.themeId.id);
      
    } else {
      alert("Llena los campos necesarios");
    }
  }
}
