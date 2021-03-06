import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  titulo:string="Registrarse"
  constructor(private menuController:MenuController) { }

  ngOnInit() {
    this.menuController.enable(false, "first")
  }

}
