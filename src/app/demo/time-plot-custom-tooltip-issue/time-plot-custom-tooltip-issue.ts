import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { TimePlotCurveService } from './time-plot-curve.service';
import { TimePlotTooltipService } from './tooltip/time-plot-tooltip.service';
import { createScene } from './create-scene';

@Component({
  selector: 'app-time-plot-custom-tooltip-issue',
  imports: [],
  templateUrl: './time-plot-custom-tooltip-issue.html',
  standalone: true,
  styleUrl: './time-plot-custom-tooltip-issue.scss',
  providers: [TimePlotCurveService, TimePlotTooltipService]
})
export class TimePlotCustomTooltipIssue implements AfterViewInit {
  @ViewChild('timePlot') timePlot: ElementRef<HTMLCanvasElement>;
  @ViewChild('timePlotWrap') timePlotWrapRef: ElementRef<HTMLDivElement>;
  private plot: Plot;
  private widget: TimeSeriesWidget;
  @ViewChild('tooltip') tooltipRef: ElementRef<HTMLDivElement>;

  constructor(private timePlotCurveService: TimePlotCurveService, private tooltipService: TimePlotTooltipService) {
  }

  ngAfterViewInit(): void {
    this.initPlot();
    const channels = [
      "WT_WH_WhP1",
      "WT_WH_WhP2",
      "WT_WH_WhP3",
      "WT_WH_WhP4",
      "WT_WH_WhP5",
      "WT_WH_WhP6"
    ];
    this.tooltipService.setChannels(channels);
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
    this.tooltipService.init(this.widget, this.tooltipRef.nativeElement);
  }
}
