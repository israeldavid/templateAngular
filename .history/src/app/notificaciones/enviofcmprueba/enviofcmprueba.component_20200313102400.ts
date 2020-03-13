import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enviofcmprueba',
  templateUrl: './enviofcmprueba.component.html',
  styleUrls: ['./enviofcmprueba.component.scss']
})
export class EnviofcmpruebaComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private _location: Location,private formBuilder: FormBuilder,) {
    this.formGroup = formBuilder.group({
      empresa: [{value: '1', disabled: true}],
      aplicacion: [{value: '1', disabled: true}],
      titulo: ['',Validators.required],
      texto: ['',Validators.required]
    });
   }

  ngOnInit() {
  }

  regresar(){
    this._location.back();
  }

  cerrar(){
    this._location.back();
  }

  enviar(){
    alert("mensaje enviado");
  }


}
