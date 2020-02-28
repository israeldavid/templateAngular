import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearpopup',
  templateUrl: './crearpopup.component.html',
  styleUrls: ['./crearpopup.component.scss']
})
export class CrearPopupComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private route:Router,private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombrePopup: ['',Validators.required],
      archivo: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(popups)");
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
