import { Group } from '@int/geotoolkit/scene/Group';
import { Rect } from '@int/geotoolkit/util/Rect';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { Plot } from '@int/geotoolkit/plot/Plot';
import { ScrollBarType } from '@int/geotoolkit/widgets/timeseries/ScrollBarType';
import { LegendPosition } from '@int/geotoolkit/widgets/timeseries/LegendPosition';
import { DateTimeFormatFactory } from '@int/geotoolkit/util/DateTimeFormatFactory';
import { TimeZone } from '@int/geotoolkit/axis/TimeZone';

enum OrientationType {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
  Auto = 'auto'
}

function createScene(
  canvas: HTMLCanvasElement,
  startDate: number,
  endDate: number,
  timeZoneOffset: string
) {
  const dateTimeFormat = DateTimeFormatFactory.getDefault().createFormat({
    timezone: timeZoneOffset,
    format: 'M d Y H:m:s'
  });

  function createWidget() {
    const options: TimeSeriesWidget.Options = {
      title: {
        visible: false
      },
      model: new Group().setModelLimits(new Rect(startDate, 0, endDate, 1)),
      tooltips: {
        visible: false
      },
      curvelimits: {
        visible: false
      },
      lastupdatedate: {
        visible: false,
        followcursor: true,
        formatter: val => dateTimeFormat.format(val)
      },
      visiblerange: {
        visible: true,
        formatter: val => dateTimeFormat.format(val)
      },
      legends: {
        visible: true,
        position: LegendPosition.Outside
      },
      timezone: dateTimeFormat.getTimeZone() as TimeZone,
      curveaxis: {
        visible: true,
        autocoloraxis: true,
        autocolorlabel: true,
        titlevisible: true,
        compact: true,
        labelorientation: OrientationType.Horizontal,
        tickgeneratoroptions: {
          major: {
            labelvisible: true,
            tickvisible: true
          }
        }
      },
      intervalbuttons: {
        visible: false
      },
      scrollbar: {
        visible: true,
        type: ScrollBarType.Advanced,
        height: 30,
        options: {
          resizable: true,
          rounded: true
        }
      }
    };
    return new TimeSeriesWidget(options);
  }

  const widget = createWidget();
  const plot = new Plot({
    canvaselement: canvas,
    root: widget
  });
  return plot;
}

export { createScene };
