import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { menusService } from '../../servicios/menus.services';
import { slidesService } from '../../servicios/slides.service';

@Component({
  selector: 'app-crearslides',
  templateUrl: './crearslides.component.html',
  styleUrls: ['./crearslides.component.scss']
})
export class CrearslidesComponent implements OnInit {
  public formGroup: FormGroup;
  token:any;
  base64textString = [];
  crearMenu:Menu = {id:1,empresa:1,aplicacion:1,nombre:'',base64: '',urlPage:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private formBuilder: FormBuilder,private route:Router) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      archivo: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(slides)");
  }

  grabar() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value)
    }
    else{
      alert("Llena los campos necesarios")
    }
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
      this.crearMenu.empresa=this.valorFormulario.empresa;
      this.crearMenu.aplicacion=this.valorFormulario.aplicacion;
      this.crearMenu.base64=this.base64textString[0];
      this.crearMenu.nombre=this.valorFormulario.nombreOpcion;
      this.crearMenu.urlPage=this.valorFormulario.nombreEnlace;
      this.ms.addMenu(this.crearMenu, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }
}
