import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Http } from '@angular/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: Http, public router: Router ) {
    this.cargar_storage();
  }

  usuarioLogeado(): boolean {
    return (this.token !== '') ? true : false;
  }

  cargar_storage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardar_storage(id: string, token: string, usuario: Usuario) {
      localStorage.setItem('id', id);
      localStorage.setItem('id', token);
      localStorage.setItem('id', JSON.stringify(usuario));
      this.usuario = usuario;
      this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post( url, { token }).pipe(
      map( (resp: any) => {
      this.guardar_storage( resp.id, resp.token, resp.usuario );
      return true;
    }));
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    if (recordar === true ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario ).pipe(
      map((resp: any) => {
      this.guardar_storage( resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  crearUsuario( user: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post( url, user ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', user.email, 'success');
        return resp.usuario;
      }));
  }
}
