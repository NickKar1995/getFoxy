import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-amounts',
  standalone: true,
  imports: [MatCardModule, AsyncPipe, CurrencyPipe],
  templateUrl: './amounts.component.html',
  styleUrl: './amounts.component.scss',
})
export class AmountsComponent {
  @Input() todayTotal$!: Observable<number>;
  @Input() monthlyTotal$!: Observable<number>;
}
