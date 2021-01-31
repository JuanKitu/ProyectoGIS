import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLogin } from '../../interfaces/interfaces';
declare const gapi:any;
@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss'],
})
export class LoginUsuarioComponent implements OnInit {
  auth2:any
  private formularioSesion:FormGroup;
  constructor(private usuarioService:UsuarioService) {
    this.formularioSesion = new FormGroup({
      'cuenta': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }
  ngOnInit() {
    this.googleInit();
  }

  googleInit(){
    gapi.load('auth2',()=>{
      this.auth2 = gapi.auth2.init({
        client_id:"1096762710491-c7d53lpa1n5uju66qi8md97gln49rv1d.apps.googleusercontent.com",
        cookiepolicy:'single_host_origin',
        scope:'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'))

    })
  }
  attachSignin(element){
    this.auth2.attachClickHandler(element,{},googleUser=>{
      /* let profile = googleUser.getBasicProfile();
      console.log(profile); */
      const token:string = googleUser.getAuthResponse().id_token;
      console.log("token mandado al cliente ", token)
      this.usuarioService.loginGoogle(token).subscribe();;
    })
  }
  iniciarSesion(formulario:FormGroup){
    if(formulario.invalid){
      return;
    };
    if(formulario.value.cuenta && formulario.value.password){
      const usuario:UsuarioLogin={
        cuenta:formulario.value.cuenta,
        password:formulario.value.password
      };
      this.usuarioService.login(usuario).subscribe(data=>{

      })
    };
  
  }

}
