import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioLocal } from '../../interfaces/interfaces';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: UsuarioLocal[];
  titulo:string="Lista de Usuarios";

  constructor(private usuarioService:UsuarioService, private route:ActivatedRoute) { }

  ngOnInit() {
    //El route.paramMar es primordial para que la lista se vuelva a actualizar cada vez que se va a la componente hija
    this.route.paramMap.subscribe(()=>{
      this.usuarioService.getAll().subscribe(data=>{
        this.usuarios=data['data'];
      });
    });
  };

}
