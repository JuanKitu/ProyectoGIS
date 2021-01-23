import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-grafico-emergente',
  templateUrl: './grafico-emergente.page.html',
  styleUrls: ['./grafico-emergente.page.scss'],
})
export class GraficoEmergentePage implements OnInit {
  constructor(private menuController:MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, "first")
  }

}
