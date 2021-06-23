import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { EnsayoService } from '../../services/ensayo.service';
import { WebSocketService } from '../../services/web-socket.service';
import { PuntoGrafico, ArrayPuntos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-grafico-ensayo',
  templateUrl: './grafico-ensayo.component.html',
  styleUrls: ['./grafico-ensayo.component.scss'],
})
export class GraficoEnsayoComponent implements OnInit {
  // @Input() idEnsayo:number;
  @Input() realTime: boolean;
  @Input() idEnsayo:number;
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'μ' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Distancia',
        },
        ticks:{
          min:0,
          max:1
        }
      }],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Coeficiente'
          },
          ticks:{
            min:0,
            max:1
          },
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private webSocket: WebSocketService, private ensayoService: EnsayoService) { }

  ngOnInit() {
    if (this.realTime){
      this.webSocket.emit('arrayPuntos', () => { })
      this.webSocket.listen('envioArray').subscribe(datos => {
        const arrayPuntos: ArrayPuntos = datos;
        const puntos: ChartDataSets[] = [{ data: arrayPuntos.arregloMu, label: 'Fuerza de rozamiento' }]
        this.lineChartData = puntos;
        const arreglosLabels: Label[] = arrayPuntos.arregloDistancias
        this.lineChartLabels = arreglosLabels;
      })
      this.webSocket.listen('parametros').subscribe((datos) => {
        const unPunto: PuntoGrafico = datos;
        this.lineChartData.forEach((x, i) => {
          const data: number[] = x.data as number[];
          data.push(unPunto.mu);
        });
        this.lineChartLabels.push(unPunto.distancia);
      });
    }else{
      this.ensayoService.getPuntosGrafico(this.idEnsayo).subscribe(data=>{
        const arrayPuntos: ArrayPuntos = data['data'];
        const puntos: ChartDataSets[] = [{ data: arrayPuntos.arregloMu, label: 'Fuerza de rozamiento' }]
        this.lineChartData = puntos;
        const arreglosLabels: Label[] = arrayPuntos.arregloDistancias
        this.lineChartLabels = arreglosLabels;
      })
    }


  }

  /*   public randomize(): void {
      for (let i = 0; i < this.lineChartData.length; i++) {
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          this.lineChartData[i].data[j] = this.generateNumber(i);
        }
      }
      this.chart.update();
    } */

  private generateNumber(i: number) {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }
  /*   public hideOne() {
      const isHidden = this.chart.isDatasetHidden(1);
      this.chart.hideDataset(1, !isHidden);
    } */

  public pushOne() {
    this.lineChartData.forEach((x, i) => {
      const num = this.generateNumber(i);
      const data: number[] = x.data as number[];
      data.push(num);
    });
    this.lineChartLabels.push(`${this.lineChartLabels.length}`);
  }

}