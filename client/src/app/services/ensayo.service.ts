import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ensayo, urlServices, Parametro } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class EnsayoService {
  ensayoURL:string = `${urlServices}ensayos`;
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
  /*################################ Parametro Service ################################*/
  getAllParametro(key$:number){
    return this.httpClient.get(this.ensayoURL+`/${key$}/parametros`);
  };
  getOneParametro(key$:number,keyP$:number){
    return this.httpClient.get(this.ensayoURL+`/${key$}/parametros/${keyP$}`);
  };
  changeParametro(parametro:Parametro,key$:number, keyP$:number){
    const body = parametro;
    console.log("Cuerpo del parametro", body)
    const headers = new HttpHeaders({
    'Content-Type':'application/json'
    });
    return this.httpClient.put(this.ensayoURL+`/${key$}/parametros/${keyP$}`,body,{headers})
  };
 deleteParametro(key$:number,keyP$:number){
    return this.httpClient.delete(this.ensayoURL+ `/${key$}/parametros/${keyP$}`);
  };

  crearListaParametros(key$:number){
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    //console.log(`${this.ensayoURL}/${key$}`)
    return this.httpClient.post(`${this.ensayoURL}/${key$}`,{headers});
  };

}
