import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';
import { Medico } from 'src/app/models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public http: Http, public _us: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        const datos = resp.json();
        return datos;
      })
    );
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.json().medico;
      })
    );
  }

  buscarMedicos(buscar: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + buscar;
    return this.http.get( url ).pipe(
      map( (response: any) => {
        const resp = response.json();
        return resp.medicos;
      })
    );
  }

  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token = ' + this._us.token;
    return this.http.delete( url ).pipe(
      map( (response: any) => {
        const resp = response.json();
        swal('Medico borrado', 'Se ha eliminado el médico correctamente', 'success');
        return resp.medicos;
      })
    );
  }

  guardarMedico( medico: Medico ) {
    let url = URL_SERVICIOS + '/medico';
    if ( medico._id ) { // actualizar medico
      url += '/' + medico._id;
      url += '?token=' + this._us.token;
      return this.http.put( url, medico ).pipe(
        map((resp: any) => {
          swal('Medico actualizado', medico.nombre, 'success');
          console.log( resp );
          return resp.json().medico;
        })
      );
    } else {
      url += '?token=' + this._us.token;
      return this.http.post(url, medico ).pipe(
        map( (resp: any) => {
          swal('Medico creado', medico.nombre, 'success');
          const datos = resp.json();
          return datos.medico;
        })
      );
    }
  }
}
