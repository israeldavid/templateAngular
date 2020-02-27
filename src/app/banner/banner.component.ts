import { Component, OnInit } from '@angular/core';
import { BannerService } from '../servicios/banner.service';
import { responseBanner } from '../interfaces/interface.banner';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { isUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  responseBanners: responseBanner;

  constructor(private bs:BannerService,private dialog: MatDialog,private router:Router) { 

  }

  ngOnInit() {
    //this.consultarBanners();
  }

  consultarBanners(){
    this.bs.obtenerBanners().subscribe(data => { 
      console.log(data);
      this.responseBanners=data;  
    });
  }

  crearBanner(parametro:string){
    this.router.navigateByUrl("crear");
    console.log("Crear Banner",parametro);
  }
}
