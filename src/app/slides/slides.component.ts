import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slidesService } from '../servicios/slides.service';
import { responseSlides } from '../interfaces/interface.slides';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  responseSlides: responseSlides;
  constructor(private route:Router,private ss:slidesService,private sanitized: DomSanitizer) { }

  ngOnInit() {
    this.consultarSlides();
  }

  consultarSlides(){
    this.ss.obtenerSliders().subscribe(data => { 
      this.responseSlides=data;  
    });
  }

  crearSlides(){
    this.route.navigateByUrl("crearslides");
  }

  eliminarslide(idSlider:number){
    this.ss.deleteSlide(idSlider);
    this.route.navigateByUrl("admin/(slides)")
  }
}
