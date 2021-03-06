import { Component } from '@angular/core';
import { DatasetOptions, Timespan } from '@helgoland/core';
import { D3PlotOptions } from '@helgoland/d3';

@Component({
    templateUrl: './timeseries-graph.component.html',
    styleUrls: ['./timeseries-graph.component.css']
})
export class TimeseriesGraphComponent {

    public datasetIds = ['https://www.fluggs.de/sos2/api/v1/__63'];
    public datasetIdsOne = ['https://www.fluggs.de/sos2/api/v1/__72'];
    // public datasetIdsMultiple = ['https://www.fluggs.de/sos2/api/v1/__26'];
    public datasetIdsMultiple = ['https://www.fluggs.de/sos2/api/v1/__63', 'https://www.fluggs.de/sos2/api/v1/__72', 'https://www.fluggs.de/sos2/api/v1/__26'];
    public colors = ['#123456', '#FF0000'];

    public timespan = new Timespan(new Date().getTime() - 100000000, new Date().getTime());
    public diagramOptionsD3: D3PlotOptions = {
        togglePanZoom: false,
        showReferenceValues: false,
        hoverable: true,
        grid: true,
        // overview: false,
        generalizeAllways: true
    };

    public selectedIds: string[] = [];

    public datasetOptions: Map<string, DatasetOptions> = new Map();
    public datasetOptionsOne: Map<string, DatasetOptions> = new Map();
    public datasetOptionsMultiple: Map<string, DatasetOptions> = new Map();
    public datasetOptionsMultiple02: Map<string, DatasetOptions> = new Map();
    public panZoom = 'zoom';

    constructor() {
        this.datasetIds.forEach((entry) => {
            this.datasetOptions.set(entry, new DatasetOptions(entry, '#123456'));
        });
        this.datasetIdsOne.forEach((entry) => {
            this.datasetOptionsOne.set(entry, new DatasetOptions(entry, '#FF0000'));
        });

        this.datasetIdsMultiple.forEach((entry, i) => {
            this.datasetOptionsMultiple.set(entry, new DatasetOptions(entry, this.colors[i]));
        });
    }

    public timespanChanged(timespan: Timespan) {
        this.timespan = timespan;
    }

    public togglePanZoom() {
        this.diagramOptionsD3.togglePanZoom = !this.diagramOptionsD3.togglePanZoom;
        this.panZoom = this.diagramOptionsD3.togglePanZoom === true ? 'pan' : 'zoom';
    }

    public highlight(ids: string[]) {
        this.selectedIds = ids;
    }
}
