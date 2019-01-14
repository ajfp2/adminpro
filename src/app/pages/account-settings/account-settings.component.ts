import { Component, OnInit, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})

export class AccountSettingsComponent implements OnInit {

  constructor( private _aj: SettingsService ) {
  }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarTema(tema: string, lnk: ElementRef ) {
    console.log('Tema: ' + tema);
    this.cambiarCheck(lnk);
    this._aj.cargarTema(tema);
  }

  cambiarCheck( link: any ) {
    const selectores: any = document.getElementsByClassName('selector');
    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    let tema: string = this._aj.ajustes.tema;
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }

  }
}
