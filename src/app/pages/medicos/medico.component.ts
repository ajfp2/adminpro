import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  // hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('', '', '', new Hospital('', '', ''));
  constructor( public _ms: MedicoService, public _hs: HospitalService, public router: Router,
    public actRoute: ActivatedRoute, public _modal: ModalUploadService ) {
    actRoute.params.subscribe( params => {
      const id = params['id'];
      if ( id !== 'nuevo') {
        this.obtenerMedico( id );
      }
    });
   }

  ngOnInit() {
    this._hs.cargarHospitales().subscribe( response => {
      const resp = response.json();
      this.hospitales = resp.hospitales;
    });

    this._modal.notificacion.subscribe( resp => {
      console.log( resp );
      this.medico.img = resp.img;
    });
  }

  obtenerMedico(id: string) {
    this._ms.cargarMedico( id ).subscribe(med => {
      this.medico = med;
      this.medico.hospital = med.hospital;
      // this.hospital = med.hospital;
    });
  }

  guardarMedico(f: NgForm) {
    if (f.invalid ) {
      return;
    }

    this._ms.guardarMedico( this.medico ).subscribe( resp => {
      this.medico._id = resp._id;
      this.router.navigate(['/medico', resp._id]);
    });
  }

  cambiaHospital(id: string) {
    this._hs.obtenerHospital(id).subscribe( resp => {
      this.medico.hospital = resp;
    });
  }

  cambiarFoto(m: Medico) {
    console.log( m );
    this._modal.mostrarModal('medicos', this.medico._id);
  }

}
