import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Coordenada } from '../../interfaces/interface.coordenada';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { UbicanosService } from '../../servicios/ubicanos.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';

@Component({
  selector: 'app-crearubicacion',
  templateUrl: './crearubicacion.component.html',
  styleUrls: ['./crearubicacion.component.scss']
})
export class CrearubicacionComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  token:any;
  base64textString = [];
  crearCoodernada:Coordenada = {id:1,empresa:1,aplicacion:1,nombre:'',longitud: '',latitud:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder: FormBuilder,
              private cs:UbicanosService, 
              private es:EmpresaService,
              private as:AplicacionService) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreSucursal: ['',Validators.required],
      longitud: ['',Validators.required],
      latitud: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
    this.consultarEmpresas();
    //this.consultarAplicaciones();
    this.token=localStorage.getItem('token');
  }

  consultarEmpresas(){
    this.es.obtenerEmpresas(this.token).subscribe(data => { 
      this.responseEmpresa=data;  
    });
  }

  consultarAplicaciones(IdEmpresa:number){
      this.as.obtenerAplicacionByEmpresa(IdEmpresa,this.token)
  }

  cambioSeleccionado(event){
    const value = event.target.value;
    console.log(value);
  }

  cerrar(){
    this.route.navigateByUrl("admin/(ubicanos)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearCoodernada.empresa=this.valorFormulario.empresa;
      this.crearCoodernada.aplicacion=this.valorFormulario.aplicacion;
      this.crearCoodernada.nombre=this.valorFormulario.nombreSucursal;
      this.crearCoodernada.longitud=this.valorFormulario.longitud;
      this.crearCoodernada.latitud=this.valorFormulario.latitud;
      this.cs.addUbicacion(this.crearCoodernada, this.obtenerToken());

    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
