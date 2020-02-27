import { Component, OnInit } from '@angular/core';
import { PopupsService } from '../servicios/popups.service';
import { responsePopups } from '../interfaces/interface.popup';
@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.scss']
})
export class PopupsComponent implements OnInit {
  token:any;
  responsePopup:responsePopups;
  constructor(private ps:PopupsService) { }

  ngOnInit() {
    this.cargarPopups();
  }

  cargarPopups(){
    this.token=localStorage.getItem('token');
    this.ps.obtenerPopup(this.token).subscribe(data => { 
      console.log(data);
      this.responsePopup=data;  
    });
  }

}
