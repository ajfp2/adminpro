import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _ci: SubirArchivoService, public _ms: ModalUploadService) {
    // console.log('Constructor: ModalUpload Component');
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this._ms.ocultarModal();
  }

  subirImagen() {
    this._ci.subirArchivo( this.imagenSubir, this._ms.tipo, this._ms.id).then( resp => {
      this._ms.notificacion.emit( resp );
      this.cerrarModal();
    })
    .catch( err => {
      console.error( err );
    });

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

}
