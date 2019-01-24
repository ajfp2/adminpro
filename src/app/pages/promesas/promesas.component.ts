import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contar3().then(
      sms => console.log('Promesa terminada', sms)
      ).catch( error => console.error('Error en la promesa', error) );
  }

  contar3(): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let cont = 0;
      let intervalo = setInterval( () => {
        cont++;
        console.log(cont);
        if (cont === 3) {
          resolve(true);
          //reject('Simplemente un error');
          clearInterval( intervalo );
        }
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
