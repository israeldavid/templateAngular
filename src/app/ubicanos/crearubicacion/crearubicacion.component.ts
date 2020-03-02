import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UbicanosService } from '../../servicios/ubicanos.service';
import { Coordenada } from '../../interfaces/interface.coordenada';

@Component({
  selector: 'app-crearubicacion',
  templateUrl: './crearubicacion.component.html',
  styleUrls: ['./crearubicacion.component.scss']
})
export class CrearubicacionComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  base64textString = [];
  crearCoodernada:Coordenada = {id:1,empresa:1,aplicacion:1,nombre:'',longitud: '',latitud:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder: FormBuilder,private cs:UbicanosService) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreSucursal: ['',Validators.required],
      longitud: ['',Validators.required],
      latitud: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(ubicanos)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearCoodernada.empresa=this.valorFormulario.empresa;
      this.crearCoodernada.aplicacion=this.valorFormulario.aplicacion;
      this.crearCoodernada.nombre=this.valorFormulario.nombreSucursal;
      this.crearCoodernada.longitud=this.valorFormulario.longitud;
      this.crearCoodernada.latitud=this.valorFormulario.latitud;
      this.cs.addUbicacion(this.crearCoodernada, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
