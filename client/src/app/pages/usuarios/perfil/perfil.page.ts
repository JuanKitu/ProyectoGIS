import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioLocal, UsuarioRegister } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: UsuarioRegister={
    idUsuario:null,
    email:'',
    legajo:null,
    password:null,
    nombreUsuario:'',
    repassword:null
  };
  titulo:string="Info usuario";
  constructor(private activeRoute:ActivatedRoute, private usuarioService:UsuarioService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{
      this.usuario.idUsuario=params['idUsuario'];
    });
    /* if(this.usuario.idUsuario){
      this.usuarioService.getOne(this.usuario.idUsuario).subscribe(async data=>{
        console.log("usuario dentro de la pagina antes del get", this.usuario)
         this.usuario = await data['data'];
        this.usuario.password="asd";
        this.usuario.repassword="asd";
        console.log("usuario dentro de la pagina despùes del get", this.usuario)
      });
    }; */
  }

}
