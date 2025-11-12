import { Injectable } from '@angular/core';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { DataTableView } from '@int/geotoolkit/data/DataTableView';
import { DataTable } from '@int/geotoolkit/data/DataTable';

@Injectable()
export class TimePlotCurveService {
  private widget: TimeSeriesWidget | undefined;
  private channelList: string[] | undefined;

  init(widget: TimeSeriesWidget): void {
    this.widget = widget;
  }

  setChannels(channelList: string[]): void {
    this.channelList = channelList;
    this.initCurves();
    this.onDataUpdate();
  }

  private initCurves(): void {
    if (this.widget && this.channelList) {
      this.widget.suspendUpdate();
      const curveList = this.widget.getCurves();
      this.widget.removeCurve(curveList);
      this.createCurveOptions(this.channelList).forEach(curve => {
        this.widget?.addCurve(curve);
      });
      this.widget.resumeUpdate();
    }
  }

  private onDataUpdate(): void {
    const data = {};
    this.channelList.forEach((mnemonic, index) => {
      const channelData = [];
      for (let i = 1758182552716; i < 1758182925773; i += 1000) {
        channelData.push([i, Math.random() + index]);
      }
      data[mnemonic] = channelData;
    });
    Object.keys(data).forEach(key => {
      const obj = this.widget.getTimeSeriesObjectById(key);
      if (!obj) {
        return;
      }
      const tableView = obj.getData() as DataTableView;
      const dataTable = tableView.getDataTable() as DataTable;
      this.widget.suspendUpdate();
      const d = data[key];
      if (d.length === dataTable.getNumberOfRows() + 1) {
        dataTable.addRows(d[0]);
      } else {
        dataTable.removeRows(0, dataTable.getNumberOfRows());
        dataTable.addRows(data[key]);
      }
      this.widget.resumeUpdate();
    });
  }

  private createCurveOptions(channelList: string[]): TimeSeriesWidget.CurveOptions[] {
    return channelList.map((mnemonic, index) => {
      return {
        name: mnemonic,
        id: mnemonic,
        uri: '//wt//' + mnemonic.toLowerCase(),
        data: new DataTableView(
          new DataTable({
            cols: [
              { type: 'number', data: [] },
              { type: 'number', data: [] }
            ]
          })
        ).setColumns([0, 1]),
        properties: {
          autoscale: true,
          axisautolabelrotation: true,
          neatlimits: true,
          unit: '',
          linestyle: {
            color: colorWheel[(colorWheel.length - 1) / index],
            width: 1
          },
          axisposition: 'left'
        }
      };
    });
  }
}

const colorWheel = [
  "#FF0000", // Red
  "#FF8000", // Orange
  "#FFFF00", // Yellow
  "#80FF00", // Chartreuse
  "#00FF00", // Green
  "#00FF80", // Spring Green
  "#00FFFF", // Cyan
  "#0080FF", // Azure
  "#0000FF", // Blue
  "#8000FF" // Violet
];
