import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, filter } from 'rxjs/operators';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;
  constructor() {
    this.subscripcion = this.regresaObservable().subscribe(
      num => console.log('Subscrito', num),
      error => console.error('ERROR', error),
      () => console.log('El observado ha finalizado')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Cerrando la página de RXJS');
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let cont = 0;
      const intervalo = setInterval( () => {
        cont++;
        const salida = {
          valor: cont
        };

        observer.next(salida);

        // if (cont === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
          // if (cont === 2) {
          //   clearInterval( intervalo );
          //   observer.error('Ayudarme!!!');
          // }

      }, 1000);
    }).pipe( map( (respuesta: any ) => respuesta.valor ),
      filter( ( valor, index ) => {
        // console.log('Filter', valor, index);
        if ((valor % 2 === 1)) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

}
