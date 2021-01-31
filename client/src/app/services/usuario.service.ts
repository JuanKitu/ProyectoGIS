import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaLogin, urlServices, UsuarioLogin, UsuarioLocal } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL:string = `${urlServices}usuarios`;
  usuario:UsuarioLocal
  token:string
  constructor(private httpClient:HttpClient, /* private storage:Storage */ ) { }
  cargarToken(){
    //this.token = this.storage.getItem('token')
  }
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
    var headers = new HttpHeaders();
    headers = headers.set('googleToken', token).set('Content-Type','application/json');

    return this.httpClient.post(url,null,{headers});
  };
  validarToken():Promise<boolean>{
    return new Promise<boolean>(resolve=>{
      const url = this.usuarioURL
      const token:string = localStorage.getItem('token')
      const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'googleToken':token
      });
      this.httpClient.get(url,{headers}).subscribe(data=>{
        if(data['ok']){
          this.usuario = data['usuario'];
          resolve(true);
        }else{
          resolve(false);
        }
      })
    })
  }


}

