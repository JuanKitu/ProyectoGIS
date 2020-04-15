import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ensayo } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnsayoService {
  ensayoURL:string = "http://192.168.0.6:3000/api/ensayos";
  constructor(private httpClient:HttpClient) { }

  new(unEnsayo:Ensayo){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(this.ensayoURL,unEnsayo,{headers});
  };
  getAll(){
    return this.httpClient.get(this.ensayoURL);
  };
  getOne(key$:number){
    return this.httpClient.get(this.ensayoURL+`/${key$}`);
  };
  change(ensayo:Ensayo,key$:number){
    const body = ensayo;
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.put(this.ensayoURL+`/${key$}`,body,{headers})
  };
  delete(key$:number){
    return this.httpClient.delete(this.ensayoURL+ `/${key$}`);
  };
}
