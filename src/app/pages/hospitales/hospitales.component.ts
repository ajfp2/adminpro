import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  desde: number = 0;
  totalHospitales: number = 0;
  cargando: boolean = true;
  hospitales: Hospital[] = [];

  constructor(public _ms: ModalUploadService, private _hs: HospitalService ) {}

  ngOnInit() {
    this.cargar_hospitales();
    this._ms.notificacion.subscribe( () => this.cargar_hospitales() );
  }

  mostrarModal( id: string ) {
    this._ms.mostrarModal('hospitales', id);
  }

  cargar_hospitales() {
    this.cargando = true;
    this._hs.cargarHospitales( this.desde ).subscribe( (response: any) => {
      const resp = response.json();
      console.log( resp );
      this.totalHospitales = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number ) {
    const carga = this.desde + valor;
    if (carga <= 0) {
      return;
    }
    if (carga >= this.totalHospitales ) {
      return;
    }
    this.desde += valor;
    this.cargar_hospitales();
  }

  crearHospital() {
    swal('Introduzca el nombre del hospital:', {
      content: 'input',
    })
    .then((value: string) => {
      if (!value || value.length === 0) {
        return;
      }
      this._hs.crearHospital(new Hospital(value)).subscribe( hospital => {
        if (hospital) {
          swal('Hospital creado', `Hospital: ${value} creado`, 'success');
          this.cargar_hospitales();
        }
      });
    });
  }

  buscar_hospital(termino: string) {

    if (termino.length >= 1) {
      this.cargando = true;
      this._hs.buscarHospitales( termino ).subscribe( (hospitales: Hospital[] ) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
    }
  }

  borrar_hospital( hospital: Hospital ) {
    swal({
      title: '¿Está seguro?',
      text: 'Esta apunto de borrar el hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((borrar) => {
      if (borrar) {
        this._hs.borrarHospital( hospital._id ).subscribe(response => {
          this.cambiarDesde(-5);
          swal('Usuario borrado correctamente', {
            icon: 'success',
          });
        });
      }
    });
  }

  actualizar_hospital( hospital: Hospital ) {
    // console.log(hospital);
    this._hs.actualizarHospital( hospital ).subscribe();
  }
}
