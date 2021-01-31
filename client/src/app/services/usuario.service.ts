import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaLogin, urlServices, UsuarioLogin } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL:string = `${urlServices}usuarios`;
  constructor(private httpClient:HttpClient) { }

  login(usuario:UsuarioLogin){
    const url = this.usuarioURL+"/login";
    const headers = new HttpHeaders({
      'Content-Type':'application/json'
    });
    return this.httpClient.post(url,usuario,{headers}).pipe(map((res: RespuestaLogin)=>{
      localStorage.setItem('id',res.id.toString());
      localStorage.setItem('token',res.token);
      localStorage.setItem('usuario',JSON.stringify(res.usuario));
      return true;
    }))
  
  };

  loginGoogle(token:string){
    const url = this.usuarioURL + "/google"
    const headers = new HttpHeaders({
      'Content-Type':'application/json',
      'googleToken':token
    });
    return this.httpClient.post(url,{headers});
  }


}

