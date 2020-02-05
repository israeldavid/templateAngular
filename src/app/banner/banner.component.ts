import { Component, OnInit } from '@angular/core';
import { BannerService } from '../servicios/banner.service';
import { responseBanner } from '../interfaces/interface.banner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  responseBanners: responseBanner;
  constructor(private bs:BannerService) { }

  ngOnInit() {
    this.consultarBanners();
  }

  consultarBanners(){
    this.bs.obtenerBanners().subscribe(data => { 
      this.responseBanners=data;  
    });
  }
}
