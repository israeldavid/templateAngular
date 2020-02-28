import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearubicacion',
  templateUrl: './crearubicacion.component.html',
  styleUrls: ['./crearubicacion.component.scss']
})
export class CrearubicacionComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder: FormBuilder) { 
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
      console.log(this.formGroup.value)
    }
    else{
      alert("Llena los campos necesarios")
    }
  }
}
