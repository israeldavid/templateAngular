import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-editarempresa',
  templateUrl: './editarempresa.component.html',
  styleUrls: ['./editarempresa.component.scss']
})
export class EditarempresaComponent implements OnInit {
  empresa:{id:number};
  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.empresa = {
      id:this.rutaActiva.snapshot.params.idempresa
    }
  }

}
