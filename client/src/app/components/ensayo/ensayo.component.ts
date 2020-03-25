import { Component, OnInit } from '@angular/core';
import { Ensayo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ensayo',
  templateUrl: './ensayo.component.html',
  styleUrls: ['./ensayo.component.scss'],
})
export class EnsayoComponent implements OnInit {
  ensayo:Ensayo
  constructor() { }

  ngOnInit() {}
  altaEnsayo(){
    console.log('hola');
  }
}
