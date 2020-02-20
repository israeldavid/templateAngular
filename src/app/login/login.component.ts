import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  passwordShown = false;
  passwordType = 'password';
  nameIcon = 'eye-off';
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    //localStorage.setItem('isLoggedin', 'true');
    console.log("Difare")
    this.router.navigateByUrl("admin");
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
