import { Component, OnInit } from '@angular/core';
import { TabsService } from '../servicios/tabs.service';
import { responseTabs } from '../interfaces/interface.tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  responseTabs: responseTabs;
  public formGroup: FormGroup;
  constructor(private ts:TabsService,
              private sanitized: DomSanitizer,
              private route:Router,
              private formBuilder: FormBuilder) 
  { 
    this.formGroup = formBuilder.group({
    empresa: ['1'],
    aplicacion: ['1'],
    titulo: ['',Validators.required],
    mensaje:['',Validators.required]
    });
  }

  ngOnInit() {
    this.consultarTabs();
  }
  consultarTabs(){
    this.ts.obtenerTabs().subscribe(data => { 
      this.responseTabs=data;  
    });
  }

  crearAplicacion(){
    this.route.navigateByUrl("crearaplicacion");
  }

  crearGrupo(){
    this.route.navigateByUrl("creargrupo")
  }

  envioFCM(){
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("Llena los campos necesarios")
    }
  }

}
