import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-multiaplicacion',
  templateUrl: './multiaplicacion.component.html',
  styleUrls: ['./multiaplicacion.component.scss']
})

export class MultiaplicacionComponent implements OnInit {

  aplicacion:string;
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
}
