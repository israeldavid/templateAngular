import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UbicanosService } from '../../servicios/ubicanos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseCoordenada,Coordenada, CoordenadaXid } from '../../interfaces/interface.Coordenada';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editarubicacion',
  templateUrl: './editarubicacion.component.html',
  styleUrls: ['./editarubicacion.component.scss']
})
export class EditarubicacionComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Coordenada = { id: 0, nombre: '', idEmpresa: 0, idAplicacion: 0,latitud:'',longitud:'' }
  coordenadaMostrar: CoordenadaXid;
  coordenadaId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgUrl:any;
  imgMostrar:string;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, private us: UbicanosService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router) { 
      this.formGroup = formBuilder.group({
        empresa: [{value: '1', disabled: true}],
        aplicacion: [{value: '1', disabled: true}],
        nombreSucursal: ['',Validators.required],
        longitud: ['',Validators.required],
        latitud: ['',Validators.required],
        estado:['1']
      });
    }

  ngOnInit() {
    this.coordenadaId = {
      id: this.rutaActiva.snapshot.params.idubicacion
    }
    this.consultarEmpresas();

    this.us.obtenerUbicacionById(this.coordenadaId.id, this.obtenerToken()).subscribe(
      data => {
        this.coordenadaMostrar = data;
        this.cargarAplicaciones(this.coordenadaMostrar.coordenada.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.coordenadaMostrar.coordenada.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.coordenadaMostrar.coordenada.idAplicacion);
        this.formGroup.controls['nombreSucursal'].setValue(this.coordenadaMostrar.coordenada.nombre);
        this.formGroup.controls['longitud'].setValue(this.coordenadaMostrar.coordenada.longitud);
        this.formGroup.controls['latitud'].setValue(this.coordenadaMostrar.coordenada.latitud);
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
  cerrar() {
    this.route.navigateByUrl("admin/(ubicanos)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.idEmpresa=this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion=this.valorFormulario.aplicacion;
      this.objetoActualizar.nombre=this.valorFormulario.nombreSucursal;
      this.objetoActualizar.longitud=this.valorFormulario.longitud;
      this.objetoActualizar.latitud=this.valorFormulario.latitud;
      this.us.addUbicacion(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(ubicanos)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }
}
