import { Injectable } from '@angular/core';
import { TimeSeriesWidget } from '@int/geotoolkit/widgets/TimeSeriesWidget';
import { DataTableView } from '@int/geotoolkit/data/DataTableView';
import { DataTable } from '@int/geotoolkit/data/DataTable';
import { mockData } from './data';

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
    const data = mockData;
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
    return channelList.map(mnemonic => {
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
            color: 'red',
            width: 1
          },
          axisposition: 'left'
        }
      };
    });
  }
}
