import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { BannerService } from '../../servicios/banner.service';
import { responseBanner, Banner} from '../../interfaces/interface.banner';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  base64textString = [];
  crearBanner:Banner = {id:1,idEmpresa:1,idAplicacion:1,nombre:'',base64: '',fechaCreacion: '', urlImagen:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder: FormBuilder,
              private bs:BannerService,
              private es:EmpresaService,
              private as:AplicacionService) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreBanner: ['',Validators.required],
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
    this.route.navigateByUrl("admin/(banner)");
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log("Reader as DataURL:",reader.readAsDataURL);
      console.log("Reader as Texto:",reader.readAsText);
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.imgUrl = btoa(e.target.result);
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  obtenerFecha(){
    const fecha = new Date();
    var dd = String(fecha.getDate());
    var mm = String(fecha.getMonth() + 1);
    var yyyy = fecha.getFullYear();
    let hoy = mm + '/' + dd + '/' + yyyy;
    return hoy;
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearBanner.id=1;
      this.crearBanner.idEmpresa=this.valorFormulario.empresa;
      this.crearBanner.idAplicacion=this.valorFormulario.aplicacion;
      this.crearBanner.base64=this.base64textString[0];
      this.crearBanner.fechaCreacion= this.obtenerFecha(); 
      this.crearBanner.nombre=this.valorFormulario.nombreBanner;
      this.crearBanner.urlImagen=this.imgUrl;
      this.bs.addBanner(this.crearBanner, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

}
