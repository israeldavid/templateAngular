import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { slidesService } from '../../servicios/slides.service';
import { Slider } from '../../interfaces/interface.slides';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-crearslides',
  templateUrl: './crearslides.component.html',
  styleUrls: ['./crearslides.component.scss']
})
export class CrearslidesComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token:any;
  base64textString = [];
  crearSlider:Slider = {idEmpresa:1,idAplicacion:1,nombre:'',base64: '',urlImagen:'',estado:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private formBuilder: FormBuilder,private route:Router,private ss:slidesService,
    private es:EmpresaService,
    private as:AplicacionService,
    private _location: Location) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      nombre:[''],
      aplicacion: ['1'],
      archivo: ['',Validators.required],
      estado:['A']
    });
  }

  ngOnInit() {
    this.consultarEmpresas();
    this.token=localStorage.getItem('token');
  }

  consultarEmpresas(){
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
    });
  }

  cambioSeleccionado(event){
    const IdEmpresa = event.target.value;
    this.as.obtenerAplicacionByEmpresa(IdEmpresa,this.token).subscribe(data => { 
      this.responseAplicacion=data;  
    });
  }

  cerrar(){
    this.route.navigateByUrl("admin/(slides)");
  }

  regresar(){
    this._location.back();
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
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearSlider.idEmpresa=this.valorFormulario.empresa;
      this.crearSlider.idAplicacion=this.valorFormulario.aplicacion;
      this.crearSlider.base64=this.imgUrl
      //this.base64textString[0];
      this.crearSlider.nombre=this.valorFormulario.nombre;
      this.crearSlider.urlImagen=this.imgUrl;
      this.crearSlider.estado=this.valorFormulario.estado;
      this.ss.addSlider(this.crearSlider, this.obtenerToken());
      this.route.navigateByUrl("admin/(slides)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
