import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmpresaService } from '../../servicios/empresa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaXid } from 'app/interfaces/interface.empresa';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.scss']
})
export class EditarempresaComponent implements OnInit {
  public formGroup: FormGroup;
  empresaId:{id:number};
  token:any;
  empresaMostrar:EmpresaXid;
  valorFormulario:any;

  constructor(private rutaActiva: ActivatedRoute,private es: EmpresaService,private formBuilder: FormBuilder,private route:Router) { 
  
  this.formGroup = formBuilder.group({
    nombreEmpresa: ['',Validators.required],
    estado:['A']
  });
  }

  ngOnInit() {
    this.empresaId = {
      id:this.rutaActiva.snapshot.params.idempresa
    }
    this.es.obtenerEmpresaXId(this.empresaId.id,this.obtenerToken()).subscribe(
      data => {
        this.empresaMostrar = data;
        this.formGroup.controls['nombreEmpresa'].setValue(this.empresaMostrar.empresa.nombre);
        this.formGroup.controls['estado'].setValue(this.empresaMostrar.empresa.estado);
      },error => {
        console.log(error);
      }
    );
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

  cerrar(){
    console.log("Cerrar");
      this.route.navigateByUrl("admin/(user-profile)");
  }

  grabar(){
    if (this.formGroup.valid) {
    this.valorFormulario = this.formGroup.value;
    this.empresaMostrar.empresa.id=this.empresaId.id;
    this.empresaMostrar.empresa.nombre=this.valorFormulario.nombreEmpresa;
    this.empresaMostrar.empresa.estado=this.valorFormulario.estado;
    this.es.editEmpresa(this.empresaMostrar,this.token=localStorage.getItem('token'))
    .subscribe(data => {
      console.log(data);
      alert("Empresa Actualizada correctamente")
    },error =>{
      console.log(error);
      alert("Empresa No se pudo Actualizar, Error en el servicio");
    })} else {
      alert("Enpresa no se pudo actualizar")
    }
  }

}
