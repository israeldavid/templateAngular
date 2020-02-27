import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearempresa',
  templateUrl: './crearempresa.component.html',
  styleUrls: ['./crearempresa.component.scss']
})
export class CrearempresaComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router, private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      nombreEmpresa: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(user-profile)");
  }

  grabar() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("Llena los campos necesarios")
    }
  }
}
