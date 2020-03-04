import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aplicacion,AppXid } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editaraplicacion',
  templateUrl: './editaraplicacion.component.html',
  styleUrls: ['./editaraplicacion.component.scss']
})

export class EditaraplicacionComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar:Aplicacion={id:0,nombre:'',estado:'',idempresa:0}
  appMostrar:AppXid;
  appId:{id:number};
  token:any;
  valorFormulario:any;
  constructor(private rutaActiva: ActivatedRoute,private as: AplicacionService,private formBuilder: FormBuilder,private route:Router) {
    this.formGroup = formBuilder.group({
      nombreApp: ['',Validators.required],
      estado:['A']
    });
   }

  ngOnInit() {
    //Obtener el Id de la entidad para la modificacion
    this.appId = {
      id:this.rutaActiva.snapshot.params.idaplicacion
    }
    //Obtiene los datos para cargar en el formulario
    this.as.obtenerAplicacionById(this.appId.id,this.obtenerToken()).subscribe(
      data => {
        this.appMostrar = data;
        this.formGroup.controls['nombreApp'].setValue(this.appMostrar.aplicacion.nombre);
        this.formGroup.controls['estado'].setValue(this.appMostrar.aplicacion.estado);
      },error => {
        console.log(error);
      }
    );
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

  cerrar(){
    this.route.navigateByUrl("admin/(user-profile)");
  }

  grabar(){
    if (this.formGroup.valid) {
    this.valorFormulario = this.formGroup.value;
    this.objetoActualizar.id=this.appId.id;
    this.objetoActualizar.idempresa=this.appId.id;
    this.objetoActualizar.nombre=this.valorFormulario.nombreApp;
    this.objetoActualizar.estado=this.valorFormulario.estado;
    this.as.editAplicacion(this.objetoActualizar,this.token=localStorage.getItem('token'))
    .subscribe(data => {
      alert("App Actualizada correctamente");
      this.route.navigateByUrl("admin/(user-profile)");
    },error =>{
      console.log(error);
      alert("App No se pudo Actualizar, Error en el servicio");
    })} else {
      alert("Formulario con errores")
    }
  }

}
