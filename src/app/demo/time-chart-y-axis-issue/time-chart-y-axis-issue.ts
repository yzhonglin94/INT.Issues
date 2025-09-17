import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { createScene } from './create-scene';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { TimePlotCurveService } from './time-plot-curve.service';

@Component({
  selector: 'app-time-chart-y-axis-issue',
  imports: [],
  templateUrl: './time-chart-y-axis-issue.html',
  standalone: true,
  styleUrl: './time-chart-y-axis-issue.scss',
  providers: [TimePlotCurveService]
})
export class TimeChartYAxisIssue implements AfterViewInit {
  @ViewChild('timePlot') timePlot: ElementRef<HTMLCanvasElement>;
  @ViewChild('timePlotWrap') timePlotWrapRef: ElementRef<HTMLDivElement>;
  private plot: Plot;
  private widget: TimeSeriesWidget;

  constructor(private timePlotCurveService: TimePlotCurveService) {
  }

  ngAfterViewInit(): void {
    this.initPlot();
    const channels = [
      "WT_WH_Wht",
      "WT_WH_Whp"
    ];
    this.timePlotCurveService.init(this.widget);
    this.timePlotCurveService.setChannels(channels);
  }

  private initPlot(): void {
    const plot = createScene(
      this.timePlot.nativeElement,
      1757574102260,
      1757577702260,
      '+08:00'
    );
    this.plot = plot;
    this.widget = plot.getRoot() as TimeSeriesWidget;
  }
}
