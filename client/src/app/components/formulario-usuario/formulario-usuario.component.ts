import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss'],
})
export class FormularioUsuarioComponent implements OnInit {
  private formularioUsuario:FormGroup;
  constructor() { }

  ngOnInit() {
    this.formularioUsuario = new FormGroup({
      'legajo': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'repassword': new FormControl('', Validators.required)
    },{
      validators: this.verificarPassword('password','repassword')
    });
  }
  crearUsuario(){
    
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
