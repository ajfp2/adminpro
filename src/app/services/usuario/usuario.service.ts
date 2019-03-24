import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Http } from '@angular/http';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: Http, public router: Router, public _sb: SubirArchivoService ) {
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
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
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
      const datos = resp.json();
      this.guardar_storage( datos.id, datos.token, datos.usuario );
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
        const datos = resp.json();
        console.log(datos);
      this.guardar_storage( datos.id, datos.token, datos.usuario);
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

  actualizarUsuario( user: Usuario ) {
    let url = URL_SERVICIOS + '/usuario/' + user._id;
    url += '?token=' + this.token;
    return this.http.put(url, user).pipe(
      map((response: any) => {
        // console.log(response);
        const resp = response.json();
        if ( user._id === this.usuario._id) {
          this.usuario = resp.usuario;
          this.guardar_storage( resp.usuario._id, this.token, resp.usuario);
        }
        swal('Usuario actualizado', this.usuario.nombre, 'success');
        return true;
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._sb.subirArchivo(file, 'usuarios', id).then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada correctamente', this.usuario.nombre, 'success');
      this.guardar_storage(id, this.token, this.usuario);
    })
    .catch(resp => {
      console.error( resp );
    });
  }

  cargarUsuarios( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( buscar: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + buscar;
    return this.http.get( url ).pipe(
      map( (response: any) => {
        const resp = response.json();
        return resp.usuarios;
      })
    );
  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url );
  }
}
