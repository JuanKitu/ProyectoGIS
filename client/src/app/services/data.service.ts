import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' //IMPORTANTE IMPORTAR HHTPCLIENTEMOPDULE DESDE EL MODULO DE ANGULAR
import { Componente } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  Componentes:Componente

  constructor(private http:HttpClient) {
  }
  
  getMenuOpciones(){
    return this.http.get<Componente[]>('assets/data/menu.json')
  };
}