import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { TabsService } from '../../servicios/tabs.service';
import { Tab } from '../../interfaces/interface.tabs';

@Component({
  selector: 'app-creartabs',
  templateUrl: './creartabs.component.html',
  styleUrls: ['./creartabs.component.scss']
})
export class CreartabsComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  base64textString = [];
  crearTab:Tab = {id:1,empresa:1,aplicacion:1,nombre:'',base64: '',urlPage:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder:FormBuilder,private ts:TabsService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreOpcion: ['',Validators.required],
      archivo: ['',Validators.required],
      nombreEnlace: ['',Validators.required],
      estado:['1']
    });
   }

  ngOnInit() {
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
      this.crearTab.empresa=this.valorFormulario.empresa;
      this.crearTab.aplicacion=this.valorFormulario.aplicacion;
      this.crearTab.base64=this.base64textString[0];
      this.crearTab.nombre=this.valorFormulario.nombreOpcion;
      this.crearTab.urlPage=this.valorFormulario.nombreEnlace;
      this.ts.addTabs(this.crearTab, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
