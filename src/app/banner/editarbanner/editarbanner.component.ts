import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BannerService } from '../../servicios/banner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseBanner, Banner, BannerXid } from '../../interfaces/interface.banner';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarbanner',
  templateUrl: './editarbanner.component.html',
  styleUrls: ['./editarbanner.component.scss']
})
export class EditarbannerComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Banner = { id: 0, nombre: '', estado: '', idEmpresa: 0, idAplicacion: 0, base64: '' }
  bannerMostrar: BannerXid;
  BannerId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgUrl:any;
  imgMostrar:string;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, private bs: BannerService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router,
    private _location: Location) { 

    this.formGroup = formBuilder.group({
      empresa: [{value: '1', disabled: true}],
      aplicacion: [{value: '1', disabled: true}],
      nombreBanner: ['', Validators.required],
      archivo: [''],
      estado: ['A']
    });
  }

  ngOnInit() {
    //Obtener el Id de la entidad para la modificacion
    this.BannerId = {
      id: this.rutaActiva.snapshot.params.idBanner
    }
    //consultar las empresas
    this.consultarEmpresas();
    //consultar las aplicaciones

    //Obtiene los datos para cargar en el formulario
    this.bs.obtenerBannerById(this.BannerId.id, this.obtenerToken()).subscribe(
      data => {
        this.bannerMostrar = data;
        this.cargarAplicaciones(this.bannerMostrar.banner.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.bannerMostrar.banner.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.bannerMostrar.banner.idAplicacion);
        this.formGroup.controls['nombreBanner'].setValue(this.bannerMostrar.banner.nombre);
        this.imgMostrar='data:image/png;base64,' + this.bannerMostrar.banner.base64;
        this.imgUrl=this.bannerMostrar.banner.base64;
        //aqui deberia ir una variable de base64 para que en el html exista una etiqueta img [variable] y se pueda ver la foto
        //this.formGroup.controls['archivo'].setValue(this.bannerMostrar.banner.base64);
        this.formGroup.controls['estado'].setValue(this.bannerMostrar.banner.estado);
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
    //this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
    //  this.responseAplicacion = data;
    //});
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
    this.route.navigateByUrl("admin/(banner)");
  }

  regresar(){
    this._location.back();
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id = this.BannerId.id;
      this.objetoActualizar.nombre = this.valorFormulario.nombreBanner;
      this.objetoActualizar.idEmpresa = this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion = this.valorFormulario.aplicacion;
      this.objetoActualizar.estado = this.valorFormulario.estado;
      this.objetoActualizar.base64 = this.imgUrl;
      //this.crearBanner.fechaCreacion= this.obtenerFecha(); 
      //this.crearBanner.urlImagen=this.imgUrl;
      this.bs.editBanner(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(banner)");
    }
    else {
      alert("Llena los campos necesarios");
    }
  }



}
