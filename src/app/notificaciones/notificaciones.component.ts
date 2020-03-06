import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { GruposService } from 'app/servicios/grupos.service';
import { responseGrupos } from '../interfaces/interface.grupo';
import { EmpresaService } from 'app/servicios/empresa.service';
import { responseEmpresa } from 'app/interfaces/interface.empresa';
import { responseAplicacion } from 'app/interfaces/interface.aplicacion';
import { AplicacionService } from 'app/servicios/aplicacion.service';
import { NotificacionesService } from 'app/servicios/notificaciones.service';
import { mensajeFCM } from 'app/interfaces/interface.fcm';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  responseGrupos: responseGrupos;
  responseEmpresa:responseEmpresa;
  responseAplicacion:responseAplicacion
  public formGroup: FormGroup;
  token:any;
  valorFormulario: any;
  crearMensaje:mensajeFCM = {headNotification:'',bodyNotification:'',topic:'',idAplicationSend:''};

  constructor(private gs:GruposService,
              private sanitized: DomSanitizer,
              private route:Router,
              private formBuilder: FormBuilder,
              private es:EmpresaService,
              private as:AplicacionService,
              private ns:NotificacionesService,
              private SpinnerService: NgxSpinnerService) 
  { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      grupo: ['1'],
      headNotification: ['',Validators.required],
      mensaje:['',Validators.required]
    });
  }

  ngOnInit() {
    this.consultarTopicos();
    this.consultarEmpresas();
  }

  consultarEmpresas(){
    this.SpinnerService.show();
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      this.responseEmpresa = data;
      this.SpinnerService.hide();
    });
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
    });
  }

  consultarTopicos(){
    this.gs.obtenerGrupos(this.token).subscribe(data => {
      this.responseGrupos = data;
    });
  }

  obtenerToken() {
    return this.token = localStorage.getItem('token');
  }

  crearAplicacion(){
    this.route.navigateByUrl("crearaplicacion");
  }

  crearGrupo(){
    this.route.navigateByUrl("creargrupo")
  }

  envioFCM(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearMensaje.headNotification=this.valorFormulario.headNotification;
      this.crearMensaje.bodyNotification=this.valorFormulario.mensaje;
      this.crearMensaje.idAplicationSend=this.valorFormulario.aplicacion;
      this.crearMensaje.topic=this.valorFormulario.grupo;
      this.ns.envioFCM(this.crearMensaje);
    }
    else{
      alert("Llena los campos necesarios")
    }
  }

}
