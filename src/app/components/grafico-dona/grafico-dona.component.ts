import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styleUrls: []
})
export class GraficoDonaComponent implements OnInit {

  @Input() doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number[] = [];
  @Input() doughnutChartType: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
