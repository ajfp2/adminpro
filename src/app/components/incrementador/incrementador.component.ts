import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input() progreso: number = 50;
  @Input() leyenda: string = 'Leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log(this.leyenda);
    console.log(this.progreso);
  }

  ngOnInit() {}

  onChanges( newValue ) {
    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit( this.progreso );
  }

  cambiarValor( valor ) {
    const total: number = this.progreso + valor;
    if ( total >= 100 ) {
      this.progreso = 100;
      return;
    }
    if ( total <= 0 ) {
      this.progreso = 0;
      return;
    }
    this.progreso = total;
    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();
  }

}
