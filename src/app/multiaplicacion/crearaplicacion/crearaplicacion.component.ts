import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crearaplicacion',
  templateUrl: './crearaplicacion.component.html',
  styleUrls: ['./crearaplicacion.component.scss']
})
export class CrearaplicacionComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      nombreApp: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(user-profile/multiaplicacion)");
  }

  grabar() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("llena los campos necesarios")
    }
  }
}
