import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.page.html',
  styleUrls: ['./ensayo.page.scss'],
})
export class EnsayoPage implements OnInit {
  nroEnsayo:number;

  constructor() { }

  ngOnInit() {
  }
  altaEnsayo(){
    console.log('hola');
  }
}
