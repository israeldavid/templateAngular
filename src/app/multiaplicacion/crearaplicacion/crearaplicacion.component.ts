import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { Aplicacion } from '../../interfaces/interface.aplicacion';
import { EmpresaService } from '../../servicios/empresa.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';

@Component({
  selector: 'app-crearaplicacion',
  templateUrl: './crearaplicacion.component.html',
  styleUrls: ['./crearaplicacion.component.scss']
})
export class CrearaplicacionComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  token:any;
  crearAplicacion:Aplicacion = {id:1,nombre:'',estado:'',idempresa:0};
  valorFormulario: any;

  constructor(private route:Router,private formBuilder: FormBuilder,private as:AplicacionService,private es:EmpresaService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      nombreApp: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
    this.consultarEmpresas();
  }
  consultarEmpresas(){
    this.token=localStorage.getItem('token');
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
    });
  }

  cerrar(){
    this.route.navigateByUrl("admin/(user-profile)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearAplicacion.idempresa=this.valorFormulario.empresa;
      this.crearAplicacion.nombre=this.valorFormulario.nombreApp;
      this.crearAplicacion.estado=this.valorFormulario.estado;
      this.as.addAplicacion(this.crearAplicacion, this.obtenerToken());
      this.route.navigateByUrl("admin/(user-profile)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
