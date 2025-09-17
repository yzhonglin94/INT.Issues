import { Component, signal } from '@angular/core';
import { TimeChartYAxisIssue } from './demo/time-chart-y-axis-issue/time-chart-y-axis-issue';

@Component({
  selector: 'app-root',
  imports: [TimeChartYAxisIssue],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('INT.Issues');
}
