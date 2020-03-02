import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PopupsService } from '../../servicios/popups.service';
import { Popups } from '../../interfaces/interface.popup';

@Component({
  selector: 'app-crearpopup',
  templateUrl: './crearpopup.component.html',
  styleUrls: ['./crearpopup.component.scss']
})
export class CrearPopupComponent implements OnInit {
  public formGroup: FormGroup;  token:any;
  base64textString = [];
  crearPopup:Popups = {id:1,empresa:1,aplicacion:1,nombre:'',base64: '',urlPage:''};
  valorFormulario: any;
  imgUrl:any;

  constructor(private route:Router,private formBuilder: FormBuilder,private ps:PopupsService) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombrePopup: ['',Validators.required],
      archivo: ['',Validators.required],
      estado:['1']
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(popups)");
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
      this.crearPopup.empresa=this.valorFormulario.empresa;
      this.crearPopup.aplicacion=this.valorFormulario.aplicacion;
      this.crearPopup.base64=this.base64textString[0];
      this.crearPopup.nombre=this.valorFormulario.nombreOpcion;
      this.crearPopup.urlPage=this.imgUrl;
      this.ps.addPopups(this.crearPopup, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

}
