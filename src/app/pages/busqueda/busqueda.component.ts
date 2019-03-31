import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Http } from '@angular/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Http } from '@angular/http';



@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public actRoute: ActivatedRoute, public http: Http, public router: Router ) {
    this.actRoute.params.subscribe(params => {
      const busca = params['termino'];
      this.buscar(busca);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe( (vuelta: any) => {
      const resp = vuelta.json();
      console.log( resp );
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
    });
  }

  verMedico(medico: Medico) {
    this.router.navigate(['/medico', medico._id]);
  }

  verHospital(hospital: Hospital) {
    this.router.navigate(['/hospitales']);
  }

  verUsuario(usuario: Usuario) {
    this.router.navigate(['/usuarios']);
  }
}
