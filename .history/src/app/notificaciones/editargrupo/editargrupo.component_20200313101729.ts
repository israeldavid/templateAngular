import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-editargrupo',
  templateUrl: './editargrupo.component.html',
  styleUrls: ['./editargrupo.component.scss']
})
export class EditargrupoComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  regresar(){
    this._location.back();
  }

}
