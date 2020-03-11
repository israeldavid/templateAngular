import { Component, OnInit } from '@angular/core';
import { responsePermisos,Permiso} from '../../interfaces/interface.permiso';
import { PermisosService } from '../../servicios/permisos.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})
export class PerfilesComponent implements OnInit {
  responsePermisos: responsePermisos;
  constructor(private ps:PermisosService,private route:Router,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.consultarPermisos();
  }

  consultarPermisos(){
    this.SpinnerService.show();
    this.ps.obtenerPermisos(localStorage.getItem('token')).subscribe(data => { 
      this.responsePermisos=data;  
      this.SpinnerService.hide();      
    });
  }

}
