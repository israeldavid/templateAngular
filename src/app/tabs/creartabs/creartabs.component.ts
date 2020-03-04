import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { TabsService } from '../../servicios/tabs.service';
import { Tab } from '../../interfaces/interface.tabs';
import { EmpresaService } from '../../servicios/empresa.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { responseEmpresa,Empresa } from '../../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../../interfaces/interface.aplicacion';

@Component({
  selector: 'app-creartabs',
  templateUrl: './creartabs.component.html',
  styleUrls: ['./creartabs.component.scss']
})
export class CreartabsComponent implements OnInit {
  public formGroup: FormGroup;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  token:any;
  base64textString = [];
  crearTab:Tab = {nombre:'',base64: '',urlPage:'',idEmpresa:1,idAplicacion:1,estado:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder:FormBuilder,private ts:TabsService,
    private es:EmpresaService,
    private as:AplicacionService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreOpcion: ['',Validators.required],
      archivo: ['',Validators.required],
      nombreEnlace: ['',Validators.required],
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
    this.route.navigateByUrl("admin/(tabs)");
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
      this.crearTab.idEmpresa=this.valorFormulario.empresa;
      this.crearTab.idAplicacion=this.valorFormulario.aplicacion;
      this.crearTab.base64=this.imgUrl;
      //this.base64textString[0];
      this.crearTab.nombre=this.valorFormulario.nombreOpcion;
      this.crearTab.urlPage=this.valorFormulario.nombreEnlace;
      this.crearTab.estado=this.valorFormulario.estado;
      this.ts.addTabs(this.crearTab, this.obtenerToken());
      this.route.navigateByUrl("admin/(tabs)");
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
