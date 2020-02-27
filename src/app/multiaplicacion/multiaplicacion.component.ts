import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiaplicacion',
  templateUrl: './multiaplicacion.component.html',
  styleUrls: ['./multiaplicacion.component.scss']
})

export class MultiaplicacionComponent implements OnInit {

  aplicacion:string;
  constructor(private dialog: MatDialog,private router:Router) { }

  ngOnInit() {
  }

  crearaplicacion(){
    this.router.navigateByUrl("crearaplicacion");
  }
}
