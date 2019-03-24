import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
// import swal from 'sweetalert';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalUsuarios: number = 0;
  cargando: boolean = true;

  constructor( private _us: UsuarioService, public _ms: ModalUploadService ) { }

  ngOnInit() {
    this.cargar_usuarios();
    this._ms.notificacion.subscribe( resp => this.cargar_usuarios() );
  }

  mostrarModal( id: string ) {
    this._ms.mostrarModal('usuarios', id);
  }

  cargar_usuarios() {
    this.cargando = true;
    this._us.cargarUsuarios( this.desde ).subscribe( (response: any) => {
      const resp = response.json();
      // console.log(resp);
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number ) {
    const carga = this.desde + valor;
    if (carga < 0) {
      return;
    }
    if (carga >= this.totalUsuarios ) {
      return;
    }
    this.desde += valor;
    this.cargar_usuarios();
  }

  buscar_usuario( termino: string ) {
    console.log( termino );
    if (termino.length >= 1) {
      this.cargando = true;
      this._us.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[] ) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
    }
  }

  borrar_usuario( usuario: Usuario ) {
    if (usuario._id === this._us.usuario._id) {
      swal('ERROR BORRANDO USUARIO', 'No se puede borrar a si mismo.', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Esta apunto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._us.borrarUsuario( usuario._id ).subscribe(response => {
          this.cambiarDesde(-5);
          swal('Usuario borrado correctamente', {
            icon: 'success',
          });
        });
      }
    });
  }

  actualizar_usuario( usuario: Usuario ) {
    console.log(usuario);
    this._us.actualizarUsuario( usuario ).subscribe();
  }

}
