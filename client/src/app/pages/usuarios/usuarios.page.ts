import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  titulo:string="Usuarios";

  constructor() { }

  ngOnInit() {
  }

}
