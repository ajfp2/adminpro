import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor( public _us: UsuarioService ) {

  }
  canActivate(): Promise<boolean> | boolean {
    const token = this._us.token;
    const payload = JSON.parse( atob( token.split('.')[1] ));
    const expirado = this.tokenExpirado ( payload.exp );

    if ( expirado ) {
      this._us.logout();
      return false;
    }


    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {
    return new Promise( (resolve, reject ) => {
      const tokenExp = new Date( fechaExp * 100);
      const ahora = new Date();
      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000));

      if ( tokenExp.getTime() > ahora.getTime() ) {
        resolve( true );
      } else {
        this._us.renovarToken().subscribe( () => {
          resolve( true );
        },
        error => {
          this._us.logout();
          reject(false);
        },
        () => {
          this._us.logout();
          reject(false);
        });
      }
    });

  }

  tokenExpirado( fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora ) {
      return true;
    }
    return false;
  }
}
