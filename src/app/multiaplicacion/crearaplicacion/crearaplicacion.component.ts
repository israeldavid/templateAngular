import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-crearaplicacion',
  templateUrl: './crearaplicacion.component.html',
  styleUrls: ['./crearaplicacion.component.scss']
})
export class CrearaplicacionComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  crearAplicacion:Aplicacion = {id:1,empresa:1,nombre:''};
  valorFormulario: any;

  constructor(private route:Router,private formBuilder: FormBuilder,private as:AplicacionService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      nombreApp: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(user-profile/multiaplicacion)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearAplicacion.empresa=this.valorFormulario.empresa;
      this.crearAplicacion.nombre=this.valorFormulario.nombreEmpresa;
      this.as.addAplicacion(this.crearAplicacion, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
