import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private usuarioService:UsuarioService) {
    
  }
/*   canActivate(){

    return false;
  } */
  canLoad(){
    return this.usuarioService.validarToken();
  }
  
}
