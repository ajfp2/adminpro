import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _us: UsuarioService ) {

  }
  canActivate(): boolean {
    if (this._us.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('ERROR- Bloqueado por el admin guard.');
      this._us.logout();
      return false;
    }
  }
}
