import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ensayo } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class EnsayoService {
  ensayoURL:string = "http://localhost:3000/api/ensayos";
  constructor(private httpClient:HttpClient) { }

  altaEnsayo(unEnsayo:Ensayo){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(this.ensayoURL,unEnsayo,{headers});
  }
}
