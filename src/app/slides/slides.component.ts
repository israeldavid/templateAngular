import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  crearSlides(){
    this.route.navigateByUrl("crearslides");
  }
}
