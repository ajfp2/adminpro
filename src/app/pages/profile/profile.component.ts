import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(public _us: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
  }

  guardar(user: Usuario) {
    if (!this.usuario.google) {
      this.usuario.nombre = user.nombre;
      this.usuario.email = user.email;
      this._us.actualizarUsuario( this.usuario ).subscribe( resp => {
      console.log(resp);
    });
    }
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      swal('ERROR- Sólo imagenes', 'El archivo selecccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;
    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  subirImagen() {
    this._us.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
