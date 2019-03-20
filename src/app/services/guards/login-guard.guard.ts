import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _us: UsuarioService , public router: Router) {

  }
  canActivate(): boolean {
    if ( this._us.usuarioLogeado() ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
