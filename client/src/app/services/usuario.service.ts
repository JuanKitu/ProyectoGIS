import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaLogin, urlServices, UsuarioLogin, UsuarioLocal, UsuarioRegister } from '../interfaces/interfaces';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioURL:string = `${urlServices}usuarios`;
  usuario:UsuarioLocal
  token:string
  constructor(private httpClient:HttpClient, private navCtrl: NavController ) { }
  cargarToken(){
    this.token = localStorage.getItem('token') || null;
  };
  async guardarToken(token:string){
    this.token=token;
    localStorage.setItem('token',token);
    await this.validarToken();
  }
  limpiarStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
  }
  register(usuario:UsuarioRegister){
    const url = this.usuarioURL;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json')
    return new Promise<boolean>(resolve=>{
      this.httpClient.post(url,usuario,{headers}).subscribe(async (resp:RespuestaLogin)=>{
        if(resp.ok){
          await this.guardarToken(resp.token);
          resolve(true)
        }else{
          this.token=null;
          this.limpiarStorage();
          resolve(false)
        }
      })
    })
  }
  login(usuario:UsuarioLogin){
    const url = this.usuarioURL+"/login";
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json')
    /* return this.httpClient.post(url,usuario,{headers}).pipe(map((res: RespuestaLogin)=>{
      localStorage.setItem('id',res.id.toString());
      localStorage.setItem('token',res.token);
      localStorage.setItem('usuario',JSON.stringify(res.usuario));
      this.usuario= res.usuario;
      return true;
    })) */
    return new Promise<boolean>(resolve=>{
      this.httpClient.post(url,usuario,{headers}).subscribe(async (res:RespuestaLogin)=>{
        console.log("respuesta del login:", res);
        console.log("respuesta del ok:", res.ok);

        if(res.ok){
          console.log("Dentro del if: ")
          await this.guardarToken(res.token);
          localStorage.setItem('id',res.id.toString());
          localStorage.setItem('usuario',JSON.stringify(res.usuario));
          this.usuario= res.usuario;
          resolve(true)
        }else{
          this.token=null;
          this.limpiarStorage();
          resolve(false)
        }
      })
    })
  
  };

  loginGoogle(token:string){
    const url = this.usuarioURL + "/google"
    let headers = new HttpHeaders();
    headers = headers.set('googleToken', token).set('Content-Type','application/json');

    return this.httpClient.post(url,null,{headers});
  };
   validarToken():Promise<boolean>{
    this.cargarToken();
    if(!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>(resolve=>{
      const url = this.usuarioURL
      const token:string = this.token
      const headers = new HttpHeaders({
        'Content-Type':'application/json',
        'googleToken':token
      });
      this.httpClient.get(url,{headers}).subscribe(data=>{
        if(data['ok']){
          this.usuario = data['usuario'];
          resolve(true);
        }else{
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }
      })
    })
  };

  
  logout(){
    this.usuario = null;
    this.token=null;
    this.limpiarStorage();
    this.navCtrl.navigateRoot('/login', {animated:true});
  };

  getAll(){
    return this.httpClient.get(this.usuarioURL)
  };
  getOne(key$:number){
    return this.httpClient.get(this.usuarioURL+`/${key$}`);
  };


}

