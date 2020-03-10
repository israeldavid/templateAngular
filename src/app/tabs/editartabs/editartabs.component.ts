import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TabsService } from '../../servicios/tabs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseTabs, Tab, TabXid } from '../../interfaces/interface.tabs';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion } from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-editartabs',
  templateUrl: './editartabs.component.html',
  styleUrls: ['./editartabs.component.scss']
})
export class EditartabsComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Tab = {idEmpresa: 0, idAplicacion: 0, nombre:'',base64: '',estado:'',urlPage:'' }
  tabMostrar: TabXid;
  tabId: { id: number };
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  valorFormulario: any;
  imgUrl:any;
  imgMostrar:string;
  base64textString = [];

  constructor(private rutaActiva: ActivatedRoute, private ts: TabsService,
    private es: EmpresaService,
    private as: AplicacionService,
    private formBuilder: FormBuilder,
    private route: Router) { 
      this.formGroup = formBuilder.group({
        empresa: [{value: '1', disabled: true}],
        aplicacion: [{value: '1', disabled: true}],
        nombreOpcion: ['',Validators.required],
        archivo: [''],
        nombreEnlace: [''],
        estado:['A']
      });
    }

  ngOnInit() {
    this.tabId = {
      id: this.rutaActiva.snapshot.params.idtabs
    }
    this.consultarEmpresas();
    //Obtiene los datos para cargar en el formulario
    this.ts.obtenerTabById(this.tabId.id, this.obtenerToken()).subscribe(
      data => {
        this.tabMostrar = data;
        this.cargarAplicaciones(this.tabMostrar.tab.idEmpresa);
        this.formGroup.controls['empresa'].setValue(this.tabMostrar.tab.idEmpresa);
        this.formGroup.controls['aplicacion'].setValue(this.tabMostrar.tab.idAplicacion);
        this.formGroup.controls['nombreOpcion'].setValue(this.tabMostrar.tab.nombre);
        this.imgMostrar='data:image/png;base64,' + this.tabMostrar.tab.base64;
        this.formGroup.controls['nombreEnlace'].setValue(this.tabMostrar.tab.urlPage);
        this.imgUrl=this.tabMostrar.tab.base64;
        this.formGroup.controls['estado'].setValue(this.tabMostrar.tab.estado);
      }, error => {
        console.log(error);
      }
    );
  }

  consultarEmpresas() {
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      this.responseEmpresa = data;
    }, err => {
      alert("Error no se ha encontrado Empresas asociadas");
    });
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.cargarAplicaciones(IdEmpresa);
  }

  cargarAplicaciones(IdEmpresa:number){
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
    }, err => {
      alert("Error no se ha encontrado Empresas asociadas");
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
    this.route.navigateByUrl("admin/(tabs)");
  }

  grabar(){
    if (this.formGroup.valid) {
      //aqui me quede comparar con las opciones de banner
      this.valorFormulario = this.formGroup.value;
      this.objetoActualizar.id=this.tabId.id;
      //this.objetoActualizar.idEmpresa=this.valorFormulario.empresa;
      //this.objetoActualizar.idAplicacion=this.valorFormulario.aplicacion;
      this.objetoActualizar.base64=this.imgUrl;
      this.objetoActualizar.nombre=this.valorFormulario.nombreOpcion;
      this.objetoActualizar.urlPage=this.valorFormulario.nombreEnlace;
      this.objetoActualizar.estado=this.valorFormulario.estado;
      this.ts.editTabs(this.objetoActualizar, this.obtenerToken());
      this.route.navigateByUrl("admin/(tabs)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

}
