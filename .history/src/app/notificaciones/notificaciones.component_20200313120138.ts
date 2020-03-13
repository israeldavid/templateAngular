import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { GruposService } from 'app/servicios/grupos.service';
import { responseGrupos, Grupo } from '../interfaces/interface.grupo';
import { EmpresaService } from 'app/servicios/empresa.service';
import { responseEmpresa } from 'app/interfaces/interface.empresa';
import { responseAplicacion,Aplicacion,AppXid } from 'app/interfaces/interface.aplicacion';
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
  responseAplicacion:responseAplicacion;
  responseAplicacionListado:responseAplicacion;
  showEmojiPickerTitle = false;
  showEmojiPickerBody = false;

  public formGroup: FormGroup;
  token:any;
  valorFormulario: any;
  nombre:string;
  appMostrar:AppXid;
  objetoActualizar:Aplicacion={id:0,nombre:'',estado:'',idempresa:0}
  //idAplicationSend este no es necesario;
  crearMensaje:mensajeFCM = {headNotification:'',bodyNotification:'',idtopic:0,urlImage:'',idAplicationReceptive:0};

  listado: Grupo[] = [];

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
      grupo: [1],
      headNotification: ['',Validators.required],
      mensaje:['',Validators.required],
      urlImagen:['',Validators.required]
    });
  }

  ngOnInit() {
    this.consultarTopicos();
    this.consultarEmpresas();
    this.consultarAplicaciones();
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

  consultarAplicaciones(){
    this.SpinnerService.show();
    this.as.obtenerAplicaciones(this.token).subscribe(data => {
      this.responseAplicacionListado = data;
      this.SpinnerService.hide();
    });
  }

  consultarTopicos(){
    this.gs.obtenerGrupos(this.token).subscribe(data => {
      this.responseGrupos = data;
    }, err => {
      alert ('No xisten Topicos cree uno');
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

  cambiarEstado(idAplicacion:number){
    //this.as.obtenerAplicacionById
    this.as.obtenerAplicacionById(idAplicacion,this.obtenerToken()).subscribe(
      data => {
        this.objetoActualizar.id=idAplicacion;
        this.objetoActualizar.nombre = data.aplicacion.nombre;
        this.objetoActualizar.estado="P";
        //Aplicacion permitida
        this.as.editAplicacion(this.objetoActualizar,localStorage.getItem('token'))
        .subscribe(data => {
          alert("App Permitida");
        },error =>{
          console.log(error);
          alert("App No se pudo Actualizar, Error en el servicio");
        })
        },error => {
          console.log(error);
        });
  }

  cargarTopicos(event) {
    this.SpinnerService.show();
    this.gs.obtenerGrupos(localStorage.getItem('token')).subscribe( data => {
      this.responseGrupos = data;
      this.listado = this.responseGrupos.topics.filter(obj => obj.idAplication == event.target.value);
      this.SpinnerService.hide();
    });
  }

  envioFCM(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearMensaje.headNotification=this.valorFormulario.headNotification;
      this.crearMensaje.bodyNotification=this.valorFormulario.mensaje;
      this.crearMensaje.idAplicationReceptive=this.valorFormulario.aplicacion;
      // this.crearMensaje.urlImage = "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y";
      this.crearMensaje.urlImage = this.valorFormulario.urlImagen;
      this.crearMensaje.idtopic=this.valorFormulario.grupo;
      this.ns.envioFCM(this.crearMensaje);
    }
    else{
      alert("Llena los campos necesarios")
    }
  }

  //Emojis
  toggleEmojiPickerTitle() {
    this.showEmojiPickerTitle = !this.showEmojiPickerTitle;
  }

  addEmojiTitle(event) {
    let mensaje = this.formGroup.controls['headNotification'].value;
    this.formGroup.controls['headNotification'].setValue(mensaje + event.emoji.native);
    this.showEmojiPickerTitle = false;
  }

  toggleEmojiPickerBody() {
    this.showEmojiPickerBody = !this.showEmojiPickerBody;
}

  addEmojiBody(event) {

    let mensaje = this.formGroup.controls['mensaje'].value;
    this.formGroup.controls['mensaje'].setValue(mensaje + event.emoji.native);
    this.showEmojiPickerBody = false;

}

}
