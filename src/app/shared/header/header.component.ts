import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor( public router: Router, public _us: UsuarioService ) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
  }

  buscar(termino: string) {
    this.router.navigate(['/busqueda', termino]);
  }

}
