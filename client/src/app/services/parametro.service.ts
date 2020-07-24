import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parametro, urlServices } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  ensayoURL:string = `${urlServices}parametros`;
  constructor(private httpClient:HttpClient) { }
}
