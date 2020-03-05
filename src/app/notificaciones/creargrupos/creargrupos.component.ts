import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Grupo } from '../../interfaces/interface.grupo';
import { GruposService } from 'app/servicios/grupos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creargrupos',
  templateUrl: './creargrupos.component.html',
  styleUrls: ['./creargrupos.component.scss']
})
export class CreargruposComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token: any;
  valorFormulario: any;
  crearGrupo:Grupo = {idAplication:1,nameGroup:''};

  constructor(private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private gs:GruposService,
    private route: Router
  ) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombregrupo: ['', Validators.required],
      estado: ['A']
    });
  }

  ngOnInit() {
    this.consultarEmpresas();
    this.token = localStorage.getItem('token');
  }

  consultarEmpresas() {
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      console.log(data)
      this.responseEmpresa = data;
    });
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
    });
  }

  obtenerToken() {
    return this.token = localStorage.getItem('token');
  }

  cerrar(){
    this.route.navigateByUrl("admin/(notificaciones)");
  }

  grabar(){
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      this.crearGrupo.idAplication=this.valorFormulario.empresa;
      this.crearGrupo.nameGroup=this.valorFormulario.nombregrupo;
      this.gs.addGrupo(this.crearGrupo, this.obtenerToken());
      this.route.navigateByUrl("admin/(notificaciones)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }
}
