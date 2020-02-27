import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { App } from '../../interfaces/interface.app';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  public formGroup: FormGroup;
  
  constructor(private route:Router,private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreBanner: ['',Validators.required],
      archivo: ['',Validators.required],
      estado:['1']
    });
  }
  
  ngOnInit() {
    
  }

  cerrar(){
    this.route.navigateByUrl("admin/(banner)");
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
