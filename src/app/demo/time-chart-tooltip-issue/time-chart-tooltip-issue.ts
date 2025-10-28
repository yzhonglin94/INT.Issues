import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { createScene } from './create-scene';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { TimePlotCurveService } from './time-plot-curve.service';

@Component({
  selector: 'app-time-chart-tooltip-issue',
  imports: [],
  templateUrl: './time-chart-tooltip-issue.html',
  standalone: true,
  styleUrl: './time-chart-tooltip-issue.scss',
  providers: [TimePlotCurveService]
})
export class TimeChartTooltipIssue implements AfterViewInit {
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
      "WT_WH_WhP"
    ];
    this.timePlotCurveService.init(this.widget);
    this.timePlotCurveService.setChannels(channels);
  }

  private initPlot(): void {
    const plot = createScene(
      this.timePlot.nativeElement,
      1758182552716,
      1758189319180,
      '+08:00'
    );
    this.plot = plot;
    this.widget = plot.getRoot() as TimeSeriesWidget;
  }
}
