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
  token:any;
  constructor(private bs:BannerService) { }

  ngOnInit() {
    //this.consultarBanners();
  }

  consultarBanners(){
    this.token=localStorage.getItem('token');
    this.bs.obtenerBanners(this.token).subscribe(data => { 
      this.responseBanners=data;     
    });
  }
}
