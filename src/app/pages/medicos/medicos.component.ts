import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando: boolean = false;
  totalMedicos: number = 0;
  medicos: Medico[] = [];

  constructor(private _ms: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.cargando = true;
    this._ms.cargarMedicos().subscribe( (resp: any) => {
      this.cargando = false;
      console.log( resp.medicos );
      this.totalMedicos = resp.total;
      this.medicos = resp.medicos;
    });
  }

  buscar_medico(termino: string ) {
    if (termino.length >= 1) {
      this.cargando = true;
      this._ms.buscarMedicos( termino ).subscribe( (medicos: Medico[] ) => {
        this.medicos = medicos;
        this.cargando = false;
      });
    }
  }

  mostrarModal(id: string) {

  }

  borrar_medico(medico: Medico) {
    this._ms.borrarMedico( medico._id).subscribe( () => this.cargarMedicos() );
  }

}
