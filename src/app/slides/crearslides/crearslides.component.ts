import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearslides',
  templateUrl: './crearslides.component.html',
  styleUrls: ['./crearslides.component.scss']
})
export class CrearslidesComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,private route:Router) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      archivo: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(slides)");
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
