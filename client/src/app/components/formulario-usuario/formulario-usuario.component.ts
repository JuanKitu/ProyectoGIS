import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLocal, UsuarioRegister } from '../../interfaces/interfaces';


@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit {
  private formularioUsuario:FormGroup;
  @Input() usuario: UsuarioRegister;
  constructor(private usuarioService:UsuarioService, private router:Router) { 
    this.formularioUsuario = new FormGroup({
      'idUsuario': new FormControl(),
      'nombreUsuario': new FormControl(),
      'legajo': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'repassword': new FormControl('', Validators.required)
    },{
      validators: this.verificarPassword('password','repassword')
    });
  }

  ngOnInit() {
    if(this.usuario.idUsuario){
        this.usuarioService.getOne(this.usuario.idUsuario).subscribe(async data=>{
          //console.log(data)
          this.usuario=await data['data'];
          this.usuario.password=null;
          this.usuario.repassword=null;
          await this.formularioUsuario.setValue(this.usuario);
        });
    }
  };
  crearUsuario(){
    if(this.usuario.idUsuario){
      //este bloque es para editar el usuario
      const key$=this.usuario.idUsuario;
      this.usuario = this.formularioUsuario.value;
      this.usuario.idUsuario=key$;
      /* this.usuarioService.change(this.usuario,this.usuario.idUsuario).subscribe(data=>{
        this.router.navigate(['/usuario','lista']);
      }); */
    }else{
      //este bloque es para un alta usuario
      const data:UsuarioRegister = this.formularioUsuario.value;
      this.usuarioService.register(data);
      this.router.navigate(['/home']);
    }
  }
  verificarPassword(pass1:string, pass2:string){
    return (group:FormGroup)=>{
      let password1 = group.controls[pass1].value;
      let password2 = group.controls[pass2].value;
      if(password1===password2){
        //pasa la validacion, por lo tanto paso un null
        return null;
      }
      //no pasa la validacion por lo tanto tengo que pasar un error
      return{
        diferentePass:true
      }
    }
  }

}
