import { Component, OnInit } from '@angular/core';
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
  crearSlider:Slider = {id:1,empresa:1,aplicacion:1,nombre:'',base64: '',urlImagen:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private formBuilder: FormBuilder,private route:Router,private ss:slidesService,
    private es:EmpresaService,
    private as:AplicacionService) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      archivo: ['',Validators.required],
      estado:['1']
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
      this.crearSlider.empresa=this.valorFormulario.empresa;
      this.crearSlider.aplicacion=this.valorFormulario.aplicacion;
      this.crearSlider.base64=this.base64textString[0];
      this.crearSlider.nombre=this.valorFormulario.nombreOpcion;
      this.crearSlider.urlImagen=this.imgUrl;
      this.ss.addSlider(this.crearSlider, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
