import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { Expense } from '../../dashboard/models/Expense';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  @Input()   top5ExpensesChartData$!: Observable<ChartData<'bar', number[], string> | null>;


  barChartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ data: [65, 59, 80], label: 'Sales' }],
  };

  barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Top 5 Expenses',
      },
    },
  };
}
