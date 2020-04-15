import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  titulo:string="Nuevo Ensayo";
  ensayo:Ensayo={
    operador:"",
    distanciaTotal:null,
    radioTrayectoria:null,
    materialBola:"",
    carga:null,
    diametroBola:null,
    codigoProbeta:"",
    durezaProbeta:null,
    tratamientoProbeta:"",
    materialProbeta:"",
    observaciones:"",
    idDato:null,
    tiempoTotal:null

  };

  constructor() {}

  ngOnInit() {}
}
