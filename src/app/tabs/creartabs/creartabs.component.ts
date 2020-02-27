import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-creartabs',
  templateUrl: './creartabs.component.html',
  styleUrls: ['./creartabs.component.scss']
})
export class CreartabsComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder:FormBuilder) {
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
    this.route.navigateByUrl("admin/(tabs)");
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
