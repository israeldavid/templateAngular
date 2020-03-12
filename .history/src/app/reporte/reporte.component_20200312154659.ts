import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EmpresaService } from '../servicios/empresa.service';
import { AplicacionService } from '../servicios/aplicacion.service';
import { responseEmpresa, Empresa } from '../interfaces/interface.empresa';
import { responseAplicacion, Aplicacion} from '../interfaces/interface.aplicacion';
import { GruposService } from '../servicios/grupos.service';
import { responseGrupos, Grupo, GrupoXid, MetricsNotification, Metricas } from '../interfaces/interface.grupo';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public formGroup: FormGroup;
  token: any;
  responseEmpresa: responseEmpresa;
  responseAplicacion: responseAplicacion;
  responseGrupos: responseGrupos;
  metricas: MetricsNotification;
  listuno: number [] = [];
  listdos: number [] = [];
  listtres: number [] = [];
  listcuatro: string [] = [];


  // Chart

  lineChartData: ChartDataSets[] = [
    { data:  [85, 72, 78, 75, 77, 75],
      label: 'Notificaciones Enviadas'
    },
    {
      data:  [75, 77, 78, 75, 72, 68],
      label: 'Notificaciones Leidas'
    }
  ];

  lineChartLabels: Label[] = ['2/Feb', '12/Feb', '15/Feb', '25/Feb', '28/Feb', '6/Marz'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  listado: Grupo[] = [];

  constructor(private formBuilder: FormBuilder,
              private route: Router,
              private es: EmpresaService,
              private as: AplicacionService,
              private gs: GruposService,
              private SpinnerService: NgxSpinnerService) {
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      topico: ['1'],
    });
  }

  ngOnInit() {
    this.consultarEmpresas();
  }

  consultarEmpresas() {
    this.es.obtenerEmpresas(this.token).subscribe(data => {
      this.responseEmpresa = data;
    });
  }
  cerrar() {
    this.route.navigateByUrl('admin/(dashboard)');
  }

  cambioSeleccionado(event) {
    const IdEmpresa = event.target.value;
    this.SpinnerService.show();
    this.as.obtenerAplicacionByEmpresa(IdEmpresa, this.token).subscribe(data => {
      this.responseAplicacion = data;
      this.SpinnerService.hide();
    });
  }

  cargarTopicos(event) {
    this.SpinnerService.show();
    this.gs.obtenerGrupos(localStorage.getItem('token')).subscribe( data => {
      console.log(data);
      this.responseGrupos = data;
      this.listado = this.responseGrupos.topics.filter(obj => obj.idAplication === event.target.value);
      this.SpinnerService.hide();
    });
  }

  visualizar() {
    this.listuno = [];
    this.listdos = [];
    this.listtres = [];
    this.listcuatro = [];
    const control = this.formGroup.get('topico');
    // añadir la aplicacion
    this.gs.visualizarDatos(control.value, localStorage.getItem('token')).subscribe( data => {
      this.metricas = data;
      this.metricas.metricsNotification.forEach((obj: Metricas) => {
          this.listuno.push(obj.enviados);
          this.listdos.push(obj.recibidos);
          this.listtres.push(obj.leidos);
          this.listcuatro.push(obj.fechaEnvio.substring(0, 10));
      })
    }, err => {
        alert('No existen datos suficientes');
    })
    this.lineChartData = [
      { data:  this.listuno,
        label: 'Notificaciones Enviadas'
      },

      {
        data:  this.listdos,
        label: 'Notificaciones Recibidos'
      },

      {
        data:  this.listtres,
        label: 'Notificaciones Leidos'
      }
    ];

    this.lineChartLabels = this.listcuatro;

  }
}
