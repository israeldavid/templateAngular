import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopupsService } from '../../servicios/popups.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responsePopups, Popups, PopupxId } from '../../interfaces/interface.popup';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarpopups',
  templateUrl: './editarpopups.component.html',
  styleUrls: ['./editarpopups.component.scss']
})
export class EditarpopupsComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Popups = { id: 0, nombre: '', estado: '', idEmpresa: 0, idAplicacion: 0, base64: '' }
  popupMostrar: PopupxId;
  popupId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgUrl:any;
  imgMostrar:string;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, private ps: PopupsService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router,
    private _location: Location) { 
      this.formGroup = formBuilder.group({
        empresa: [{value: '1', disabled: true}],
        aplicacion: [{value: '1', disabled: true}],
        nombrePopup: ['',Validators.required],
        archivo: [''],
        estado:['A']
      });

    }

  ngOnInit() {
    this.popupId = {
      id: this.rutaActiva.snapshot.params.idpopup
    }

    this.consultarEmpresas();

    this.ps.obtenerPopupById(this.popupId.id, this.obtenerToken()).subscribe(
      data => {
        this.popupMostrar = data;
        this.cargarAplicaciones(this.popupMostrar.popup.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.popupMostrar.popup.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.popupMostrar.popup.idAplicacion);
        this.formGroup.controls['nombrePopup'].setValue(this.popupMostrar.popup.nombre);
        this.imgMostrar='data:image/png;base64,' + this.popupMostrar.popup.base64;
        this.imgUrl=this.popupMostrar.popup.base64;
        //aqui deberia ir una variable de base64 para que en el html exista una etiqueta img [variable] y se pueda ver la foto
        //this.formGroup.controls['archivo'].setValue(this.bannerMostrar.banner.base64);
        this.formGroup.controls['estado'].setValue(this.popupMostrar.popup.estado);
      }, error => {
        console.log(error);
      }
    );
  }

  consultarEmpresas() {
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      this.responseEmpresa = data;
    });
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.cargarAplicaciones(IdEmpresa);
  }

  cargarAplicaciones(IdEmpresa:number){
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
    });
  }

  obtenerToken() {
    return this.token = localStorage.getItem('token');
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.imgUrl = btoa(e.target.result);
    //this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.base64textString.push(btoa(e.target.result));
  }

  cerrar() {
    this.route.navigateByUrl("admin/(popups)");
  }

  regresar(){
    this._location.back();
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id=this.popupId.id;
      this.objetoActualizar.idEmpresa=this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion=this.valorFormulario.aplicacion;
      this.objetoActualizar.nombre=this.valorFormulario.nombrePopup;
      this.objetoActualizar.base64=this.imgUrl;
      //this.base64textString[0];
      this.objetoActualizar.estado=this.valorFormulario.estado;
      this.ps.editPopup(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(popups)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

}
