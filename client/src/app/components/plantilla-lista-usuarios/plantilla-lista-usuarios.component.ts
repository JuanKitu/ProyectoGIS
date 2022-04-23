import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioLocal } from '../../interfaces/interfaces';

@Component({
  selector: 'app-plantilla-lista-usuarios',
  templateUrl: './plantilla-lista-usuarios.component.html',
  styleUrls: ['./plantilla-lista-usuarios.component.scss'],
})
export class PlantillaListaUsuariosComponent implements OnInit {
  @Input() usuarios: UsuarioLocal[];
  selectedIndex:number
  titulo:string="Lista de Ensayos";
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
    console.log("Uusuarios en el componente; ",this.usuarios)
  }

  doRefresh(event) {
    setTimeout(() => {
      this.usuarioService.getAll().subscribe(data=>{
        this.usuarios=data['data'];
        console.log("Actualizando lista: ", this.usuarios)
      });
      event.target.complete();
    }, 1500);
  }

}
