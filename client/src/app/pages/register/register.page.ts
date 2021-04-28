import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UsuarioLocal } from '../../interfaces/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  titulo:string="Registrarse"
  usuario: UsuarioLocal={
    idUsuario:null,
    email:'',
    legajo:null,
    nombreUsuario:''
  };
  constructor(private menuController:MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, "first")
  }

}
