import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ensayo, urlServices } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class EnsayoArchivadoService {
  ensayoURL:string = `${urlServices}ensayos_archivados`;
  constructor(private httpClient:HttpClient) { 
    console.log("Servicio andando")
  }

  getAll(){
    return this.httpClient.get(this.ensayoURL);
  };
  getOne(key$:number){
    return this.httpClient.get(this.ensayoURL+`/${key$}`);
  };
  delete(key$:number){
    return this.httpClient.delete(this.ensayoURL+ `/${key$}`);
  };
  restore(key$:number){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(this.ensayoURL+ `/${key$}`,{headers});
  };
    /*################################ Parametro Service ################################*/
    getAllParametro(key$:number){
      return this.httpClient.get(this.ensayoURL+`/${key$}/parametros_archivados`);
    };
    getOneParametro(key$:number,keyP$:number){
      return this.httpClient.get(this.ensayoURL+`/${key$}/parametros_archivados/${keyP$}`);
    };
}
