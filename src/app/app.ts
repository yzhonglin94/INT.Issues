import { Component, signal } from '@angular/core';
import { TimeChartYAxisIssue } from './demo/time-chart-y-axis-issue/time-chart-y-axis-issue';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeChartTooltipIssue } from './demo/time-chart-tooltip-issue/time-chart-tooltip-issue';

enum IssueType {
  Tooltip = 'tooltip',
  YAxis = 'yAxis'
}

@Component({
  selector: 'app-root',
  imports: [TimeChartYAxisIssue, TimeChartTooltipIssue, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  issueType = IssueType.YAxis;
  IssueType = IssueType;
  options = [
    {
      key: IssueType.Tooltip,
      name: 'Tooltip Issue'
    }, {
      key: IssueType.YAxis,
      name: 'Y Axis'
    }
  ];
  protected readonly title = signal('INT.Issues');
}
