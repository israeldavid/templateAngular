import { Component, OnInit } from '@angular/core';
import { BannerService } from '../servicios/banner.service';
import { responseBanner } from '../interfaces/interface.banner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
