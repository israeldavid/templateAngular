import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmpresaService } from '../../servicios/empresa.service';
import { responseEmpresa, Empresa} from '../../interfaces/interface.empresa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.scss']
})
export class EditarempresaComponent implements OnInit {
  public formGroup: FormGroup;
  empresa:{id:number};
  datosEmpresa:any;
  token:any;
  constructor(private rutaActiva: ActivatedRoute,private es: EmpresaService,private formBuilder: FormBuilder) { 
  
  this.formGroup = formBuilder.group({
    nombreEmpresa: ['',Validators.required],
    estado:['A']
  });
  }

  ngOnInit() {
    this.empresa = {
      id:this.rutaActiva.snapshot.params.idempresa
    }
    this.datosEmpresa = this.es.obtenerEmpresaXId(this.empresa.id,this.obtenerToken());
    console.log("Datos empresa: " + this.datosEmpresa);
    this.formGroup.controls['nombreEmpresa'].setValue(this.datosEmpresa.nombre);
    this.formGroup.controls['estado'].setValue(this.datosEmpresa.estado);
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

}
