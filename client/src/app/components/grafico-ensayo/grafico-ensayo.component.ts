import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { EnsayoService } from '../../services/ensayo.service';
import { WebSocketService } from '../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-grafico-ensayo',
  templateUrl: './grafico-ensayo.component.html',
  styleUrls: ['./grafico-ensayo.component.scss'],
})
export class GraficoEnsayoComponent implements OnInit, OnDestroy {
  @Input() idEnsayo:number;
  parametroSubscription: Subscription
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private ensayoService:EnsayoService, private webSocket:WebSocketService) { }

  ngOnInit() {
    console.log("Entrando a la peticion",this.idEnsayo)
    this.ensayoService.crearListaParametros(this.idEnsayo).subscribe();

    this.parametroSubscription= this.webSocket.listen('parametro').subscribe(data2=>{
      console.log("Info del socket de parametros: ", data2);
    });
    this.parametroSubscription= this.webSocket.listen('prueba').subscribe(data2=>{
      console.log("prueba: ", data2);
    });
    
  }
  ngOnDestroy(){
    this.parametroSubscription.unsubscribe();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }
}