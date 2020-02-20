import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { User } from '../interfaces/interface.user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordShown = false;
  passwordType = 'password';
  nameIcon = 'eye-off';

  formLogin: FormGroup;


  constructor(private router: Router,private as:AuthService,public fb: FormBuilder,private swal2:SweetAlertService) { 
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
  });
  }

  ngOnInit() {
  }

  onLogin(sendata:User) {
    //localStorage.setItem('isLoggedin', 'true');
    if (this.formLogin.invalid){
      return;
    } else {
      console.log("Formulario: ", sendata);
      this.as.validarUsuario(sendata).subscribe((respuesta) => {
        if (respuesta.login.token){
          this.router.navigateByUrl('admin');
        }
      },err => {
        //this.swal2.success
        this.swal2.error({ title: 'Error de Usuario o Clave' });
      })
    }
  
  }

  mostrarPassword(){
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
      this.nameIcon = 'eye-off';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
      this.nameIcon = 'eye';
    }
  }
}
