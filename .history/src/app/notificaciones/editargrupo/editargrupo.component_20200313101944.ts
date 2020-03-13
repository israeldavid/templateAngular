import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editargrupo',
  templateUrl: './editargrupo.component.html',
  styleUrls: ['./editargrupo.component.scss']
})
export class EditargrupoComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private _location: Location,private formBuilder: FormBuilder,) { 
    this.formGroup = formBuilder.group({
      empresa: [{value: '1', disabled: true}],
      aplicacion: [{value: '1', disabled: true}],
      nombreGrupo: ['',Validators.required],
      estado:['A']
    });
  }

  ngOnInit() {
  }

  regresar(){
    this._location.back();
  }

  grabar(){

  }

  cerrar(){
    
  }

}
