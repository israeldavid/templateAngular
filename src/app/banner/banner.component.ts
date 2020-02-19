import { Component, OnInit } from '@angular/core';
import { BannerService } from '../servicios/banner.service';
import { responseBanner } from '../interfaces/interface.banner';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PopupBannerComponent } from '../components/popup-banner/popup-banner.component'
import { isUndefined } from 'util';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  responseBanners: responseBanner;
  constructor(private bs:BannerService,private dialog: MatDialog) { 

  }

  ngOnInit() {
    this.consultarBanners();
  }

  consultarBanners(){
    this.bs.obtenerBanners().subscribe(data => { 
      this.responseBanners=data;  
    });
  }

  crearBanner(){
    console.log("Crear Banner");
  }
}
