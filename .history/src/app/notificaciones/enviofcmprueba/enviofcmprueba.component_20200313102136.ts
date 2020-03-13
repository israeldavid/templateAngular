import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enviofcmprueba',
  templateUrl: './enviofcmprueba.component.html',
  styleUrls: ['./enviofcmprueba.component.scss']
})
export class EnviofcmpruebaComponent implements OnInit {

  constructor(private _location: Location,private formBuilder: FormBuilder,) { }

  ngOnInit() {
  }

  regresar(){
    this._location.back();
  }



}
