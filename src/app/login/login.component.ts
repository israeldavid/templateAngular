import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { User } from '../interfaces/interface.user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

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


  constructor(private router: Router,
              private as:AuthService,
              private fb: FormBuilder,
              private SpinnerService: NgxSpinnerService) { 
    this.formLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
  });
  }

  ngOnInit() {
  }

  onLogin(sendata:User) {
    localStorage.setItem('isLoggedin', 'true');
    this.SpinnerService.show();
    if (this.formLogin.invalid){
      return;
    } else {
      this.as.validarUsuario(sendata).subscribe((res) => {
        if (res.login.token) {
          localStorage.setItem('token', res.login.token);
          this.SpinnerService.hide();
          this.router.navigateByUrl('admin/(dashboard)');
        }
      },err => {
        alert("Error;");
      });  
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
