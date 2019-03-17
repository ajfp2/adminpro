import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;
  constructor( public router: Router, private _us: UsuarioService ) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) { this.recuerdame = true; }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1088493231818-elsp1u310b6os7r6b65uf5er0lum7b9t.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      this._us.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard' );
    });
  }

  ingresar( forma: NgForm ) {
    if ( forma.invalid ) {
      return;
    }
    const usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._us.login( usuario, this.recuerdame ).subscribe( correcto => this.router.navigate(['/dashboard']));
  }

}
