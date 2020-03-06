import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { slidesService } from '../../servicios/slides.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseSlides, Slider, SliderXid } from '../../interfaces/interface.slides';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarslides',
  templateUrl: './editarslides.component.html',
  styleUrls: ['./editarslides.component.scss']
})
export class EditarslidesComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Slider = { id: 0, nombre: '', base64: '', estado: '',idEmpresa:0,idAplicacion:0}
  slideMostrar: SliderXid;
  slideId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgMostrar:string;
  imgUrl:any;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, private ss: slidesService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router,
    private _location: Location) { 
      this.formGroup = formBuilder.group({
        empresa: ['1'],
        nombre:[''],
        aplicacion: ['1'],
        archivo: [''],
        estado:['A']
      });
    }

  ngOnInit() {
    this.slideId = {
      id: this.rutaActiva.snapshot.params.idslide
    }
    //consultar las empresas
    this.consultarEmpresas();
    //consultar las aplicaciones

    //Obtiene los datos para cargar en el formulario
    this.ss.obtenerSliderById(this.slideId.id, this.obtenerToken()).subscribe(
      data => {
        this.slideMostrar = data;
        this.cargarAplicaciones(this.slideMostrar.slide.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.slideMostrar.slide.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.slideMostrar.slide.idAplicacion);
        this.formGroup.controls['nombre'].setValue(this.slideMostrar.slide.nombre);
        this.imgMostrar='data:image/png;base64,' + this.slideMostrar.slide.base64;
        this.imgUrl=this.slideMostrar.slide.base64;
        this.formGroup.controls['estado'].setValue(this.slideMostrar.slide.estado);
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
    this.route.navigateByUrl("admin/(slides)");
  }

  regresar(){
    this._location.back();
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id = this.slideId.id;
      this.objetoActualizar.nombre = this.valorFormulario.nombre;
      this.objetoActualizar.idEmpresa = this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion = this.valorFormulario.aplicacion;
      this.objetoActualizar.base64=this.imgUrl;
      this.objetoActualizar.estado = this.valorFormulario.estado;
      this.ss.editSlider(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(slides)");
    }
    else {
      alert("Llena los campos necesarios");
    }
  }
}
