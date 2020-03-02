import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EmpresaService } from '../../servicios/empresa.service';
import { Empresa } from '../../interfaces/interface.empresa';

@Component({
  selector: 'app-crearempresa',
  templateUrl: './crearempresa.component.html',
  styleUrls: ['./crearempresa.component.scss']
})
export class CrearempresaComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  crearEmpresa:Empresa = {nombre:'', estado:'A'};
  valorFormulario: any;
  mensaje:string;

  constructor(private route:Router, private formBuilder: FormBuilder,private es:EmpresaService) { 
    this.formGroup = formBuilder.group({
      nombreEmpresa: ['',Validators.required],
      estado:['A']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    if (!this.formGroup.valid) {
      this.route.navigateByUrl("admin/(user-profile)");
    }
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearEmpresa.nombre=this.valorFormulario.nombreEmpresa;
      this.crearEmpresa.estado=this.valorFormulario.estado;
      this.es.addEmpresa(this.crearEmpresa,this.obtenerToken());
      alert("Empresa Creada con Exito");
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
