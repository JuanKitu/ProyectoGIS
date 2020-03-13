import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  appPages: Observable<Componente[]>;
  darkMode:boolean = false;
  constructor(private dataService:DataService ) {
      
     }

  ngOnInit() {
    this.appPages = this.dataService.getMenuOpciones();
  }
  darkModeChange(){
    this.darkMode = !this.darkMode;
    console.log(this.darkMode);

      document.body.classList.toggle('dark');

  }
}
