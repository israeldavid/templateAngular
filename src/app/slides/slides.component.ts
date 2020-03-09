import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slidesService } from '../servicios/slides.service';
import { responseSlides } from '../interfaces/interface.slides';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {
  responseSlides: responseSlides;
  constructor(private route:Router,private ss:slidesService,
              private sanitized: DomSanitizer,
              private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.consultarSlides();
  }

  consultarSlides(){
    this.SpinnerService.show();
    this.ss.obtenerSliders().subscribe(data => { 
      this.responseSlides=data; 
      this.SpinnerService.hide(); 
    });
  }

  crearSlides(){
    this.route.navigateByUrl("crearslides");
  }

  editarslides(idslide:number){
    this.route.navigateByUrl("editarslides/"+idslide);
  }

  eliminarslide(idSlider:number){
    if(window.confirm('Estas seguro de eliminar ?')){
      this.ss.deleteSlide(idSlider);
      this.route.navigateByUrl("admin/(slides)")
    } else {
      alert("No se elimino el Slide");
    }
  }
}
