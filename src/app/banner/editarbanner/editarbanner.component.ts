import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BannerService } from '../../servicios/banner.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { responseBanner, Banner, BannerXid } from '../../interfaces/interface.banner';

@Component({
  selector: 'app-editarbanner',
  templateUrl: './editarbanner.component.html',
  styleUrls: ['./editarbanner.component.scss']
})
export class EditarbannerComponent implements OnInit {
  public formGroup: FormGroup;
  objetoActualizar: Banner = { id: 0, nombre: '', estado: '', idEmpresa: 0, idAplicacion: 0, base64: '' }
  bannerMostrar:BannerXid;
  BannerId: { id: number };
  token: any;
  valorFormulario: any;

  constructor(private rutaActiva: ActivatedRoute, private bs: BannerService,
    private formBuilder: FormBuilder, private route: Router) {

    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      nombreBanner: ['', Validators.required],
      archivo: ['', Validators.required],
      estado: ['A']
    });
  }

  ngOnInit() {
    //Obtener el Id de la entidad para la modificacion
    this.BannerId = {
      id:this.rutaActiva.snapshot.params.idaplicacion
    }

    //Obtiene los datos para cargar en el formulario
    this.bs.obtenerBannerById(this.BannerId.id,this.obtenerToken()).subscribe(
      data => {
        this.bannerMostrar = data;
        this.formGroup.controls['empresa'].setValue(this.bannerMostrar.banner.nombre);
        this.formGroup.controls['aplicacion'].setValue(this.bannerMostrar.banner.nombre);
        this.formGroup.controls['nombreBanner'].setValue(this.bannerMostrar.banner.nombre);
        //aqui deberia ir una variable de base64 para que en el html exista una etiqueta img [variable] y se pueda ver la foto
        this.formGroup.controls['archivo'].setValue(this.bannerMostrar.banner.estado);
        this.formGroup.controls['estado'].setValue(this.bannerMostrar.banner.estado);
      },error => {
        console.log(error);
      }
    );
  }

  obtenerToken(){
    return this.token=localStorage.getItem('token');
  }

  cerrar(){
    this.route.navigateByUrl("admin/(banner)");
  }

  grabar() {
    if (this.formGroup.valid) {
      this.valorFormulario = this.formGroup.value;
      //this.crearBanner.id=1;
      this.objetoActualizar.nombre=this.valorFormulario.nombreBanner;
      //this.objetoActualizar.base64=this.imgUrl;
      this.objetoActualizar.idEmpresa=this.valorFormulario.empresa;
      this.objetoActualizar.idAplicacion=this.valorFormulario.aplicacion;
      this.objetoActualizar.estado=this.valorFormulario.estado;
      //this.crearBanner.fechaCreacion= this.obtenerFecha(); 
      //this.crearBanner.urlImagen=this.imgUrl;
      this.bs.addBanner(this.objetoActualizar, this.obtenerToken());
    }
    else{
      alert("Llena los campos necesarios");
    }
  }



}
