import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crearmenus',
  templateUrl: './crearmenus.component.html',
  styleUrls: ['./crearmenus.component.scss']
})
export class CrearmenusComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreOpcion: ['',Validators.required],
      archivo: ['',Validators.required],
      nombreEnlace: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(menus)");
  }

  grabar(){
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("Llena los campos necesarios")
    }
  }
}
