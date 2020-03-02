import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators} from '@angular/forms';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  public formGroup: FormGroup;
  //Chart

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

  constructor(private formBuilder: FormBuilder,private route:Router) { 
    this.formGroup = formBuilder.group({
      empresa: ['1'],
      aplicacion: ['1'],
      topico: ['1'],
    });
  }

  ngOnInit() {
  }

  cerrar(){
    this.route.navigateByUrl("admin/(dashboard)");
  }
}
