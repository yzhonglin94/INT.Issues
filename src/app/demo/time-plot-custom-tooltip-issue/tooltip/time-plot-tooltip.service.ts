import { Injectable } from '@angular/core';
import { SymbolShape } from '@int/geotoolkit/scene/shapes/SymbolShape';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { from } from '@int/geotoolkit/selection/from';
import { CirclePainter } from '@int/geotoolkit/scene/shapes/painters/CirclePainter';
import { Group } from '@int/geotoolkit/scene/Group';
import { Node } from '@int/geotoolkit/scene/Node';
import { ToolTipTool } from '@int/geotoolkit/controls/tools/ToolTipTool';
import { Point } from '@int/geotoolkit/util/Point';
import { Subscription } from 'rxjs';

@Injectable()
export class TimePlotTooltipService {
  private markers: SymbolShape[] = [];
  private manipulatorLayer: Group<Node>;
  private channelList: string[];
  private offsetSub: Subscription;
  private widget: TimeSeriesWidget;

  setChannels(channelList: string[]): void {
    this.channelList = channelList;
    this.updateMarkers();
  }

  dispose(): void {
    this.widget.off();
    this.offsetSub.unsubscribe();
  }

  init(widget: TimeSeriesWidget, tooltip: HTMLDivElement): void {
    this.manipulatorLayer = from(widget)
      .where('node => id(node) == "manipulator_layer"')
      .selectFirst();
    this.widget = widget;
    this.updateMarkers();
    this.addToolTipTool(widget, tooltip);
  }

  private updateMarkers(): void {
    if (!this.manipulatorLayer || !this.channelList) {
      return;
    }
    this.channelList.forEach(() => {
      this.markers.push(
        new SymbolShape({
          ax: 0,
          ay: 0,
          width: 10,
          height: 10,
          sizeisindevicespace: true,
          linestyle: null,
          fillstyle: {
            color: 'transparent'
          },
          painter: CirclePainter,
          visible: false
        })
      );
    });
    this.manipulatorLayer.insertChild(0, new Group().addChild(this.markers).setVerticalFlip(true));
  }

  private addToolTipTool(widget: TimeSeriesWidget, tooltip: HTMLDivElement) {
    const toolTipTool = new ToolTipTool({
      divelement: tooltip,
      layer: widget,
      showdelay: 100,
      autoflip: true,
      autoupdate: true,
      callback: pt => {
        const x = Math.floor(pt.getX());
        const lineData = widget.hitTest(pt);
        return this.generateTooltip(lineData, widget);
      }
    });
    widget.connectTool(toolTipTool);
  }

  private generateTooltip(
    lineData: TimeSeriesWidget.CurveData[],
    widget: TimeSeriesWidget
  ): string {
    let tip = '';
    const style =
      'margin-right: 5px; height: 10px; width: 10px; background-color: transparent; ' +
      'border-radius: 50%; display: inline-block;';
    lineData.forEach((data, index) => {
      const marker = this.markers[index];
      marker.setVisible(true);
      marker.setFillStyle(data['symbol'].getFillStyle());

      const curve = data['curve'];
      let symbolPoint = new Point(data['position'], data['value']);
      if (curve.getWorldTransform() != null) {
        symbolPoint = curve.getWorldTransform().transformPoint(symbolPoint, symbolPoint);
      }
      marker.setAnchor(symbolPoint);
      const timeSeriesObject = widget.getTimeSeriesObjectById(data['id']);
      const formatter = timeSeriesObject.getTooltipOptions()['formatter'];
      const color = data['symbol'].getFillStyle().getColor();
      if (!data.originalvalue) {
        return;
      }
      if (index === 1) {
        tip += `<div class="timeplot-tooltip-separator"></div>`;
      }
      tip += `<div class="timeplot-tooltip-field">`;
      tip += `<div class="timeplot-tooltip-time">
            ${data.position}
          </div>`;
      tip += `<div class="timeplot-tooltip-item">
              <span class="name">
                <span style="${style} background-color: ${color}"></span>
                ${data.name}
              </span>
              <div>
                <span class="value">
                  ${formatter.format(data['originalvalue'])}
                </span>
                <span class="unit">${data.originalunit}</span>
              </div>
            </div>`;
      tip += `</div>`;
    });
    return tip;
  }
}
