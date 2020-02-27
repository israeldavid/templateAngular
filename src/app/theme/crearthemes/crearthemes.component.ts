import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crearthemes',
  templateUrl: './crearthemes.component.html',
  styleUrls: ['./crearthemes.component.scss']
})
export class CrearthemesComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombretheme: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(theme");
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
