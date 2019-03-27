import { Injectable } from '@angular/core';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Http } from '@angular/http';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  constructor(public http: Http, public _sb: SubirArchivoService, private _us: UsuarioService ) {
    this.token = this._us.token;
  }

  cargarHospitales( desde: number = 0 ) {
    const url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(
      map((resp: any) => {
        const datos = resp.json();
        return datos.hospital;
      })
    );
  }

  crearHospital( hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital?token=' + this.token;
    return this.http.post( url, hospital ).pipe(
      map( (resp: any) => {
        return resp;
      }));
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(
      map((response: any) => {
        const resp = response.json();
        console.log(resp);
        swal('Hospital actualizado', resp.hospital.nombre, 'success');
        return true;
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._sb.subirArchivo(file, 'hospitales', id).then( (resp: any) => {
      // resp.hospital.img;
      swal('Imagen actualizada correctamente', resp.hospital.nombre, 'success');
      // this.guardar_storage(id, this.token, this.usuario);
    })
    .catch(resp => {
      console.error( resp );
    });
  }

  buscarHospitales( buscar: string ) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + buscar;
    return this.http.get( url ).pipe(
      map( (response: any) => {
        const resp = response.json();
        return resp.hospitales;
      })
    );
  }

  borrarHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this.token;

    return this.http.delete( url );
  }
}
