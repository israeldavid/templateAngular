import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  crearTheme(){
    this.route.navigateByUrl("crearthemes");
  }
}
