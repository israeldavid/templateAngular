import { Component, OnInit } from '@angular/core';
import { BannerService } from '../servicios/banner.service';
import { responseBanner } from '../interfaces/interface.banner';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  responseBanners: responseBanner;
  token: any;
  page: any = 1;

  collectionSize: number;
  numeroItems = 4;

  constructor(private bs: BannerService,
              private dialog: MatDialog,
              private router: Router,
              private SpinnerService: NgxSpinnerService) {}

  ngOnInit() {
    this.consultarBanners();
  }

  consultarBanners() {
    this.token = localStorage.getItem('token');
    this.SpinnerService.show();
    this.bs.obtenerBanners(this.token).subscribe(
      data => {
        this.responseBanners = data;
        this.collectionSize = data.count;
        this.SpinnerService.hide();
      }, err => {
        this.SpinnerService.hide();
    });
  }

  crearBanner() {
    this.router.navigateByUrl('crear');
  }

  editarBanner(idBanner: number) {
    this.router.navigateByUrl('editarbanner/' + idBanner);
  }

  eliminarBanner(idBanner: number) {
    if (window.confirm('Estas seguro de eliminar ?')) {
      this.bs.deleteBanner(idBanner, this.token = localStorage.getItem('token'));
      this.consultarBanners();
    } else {
      alert('No se elimino el banner');
    }


  }
}
