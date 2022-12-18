/**
 * draw the provided data in a time series chart
 */
import { DisplayPlugin } from "../framework/DisplayPlugin";
import { Framework } from "../framework/Framework";
import { StateData } from "../components/FrameworkState";

import c3 from 'c3';

class timeSeries implements DisplayPlugin {

    onRegister (framework: Framework): void {}

    getName(): string {
        return "Time Series";
    }

    /**
     * if {@link data.xLabels.slice(1)} contains strings that are not convertable to a date object, the chart
     * will not show up, instead a explanation message will be displayed.
     */
    loadChart(elementId: string, data: StateData | undefined): void {
        if (data === undefined)
            return;
        let xSeries = data.xLabels;
        let dataSeries: (string | number)[][] = [];
        let i = 0;
        for (let dataList of data.data) {
            dataSeries.push([]);
            for (let value of dataList.data)
                dataSeries[i].push(value);
            dataSeries[i].unshift(dataList.label);
            i ++;
        }
        // check the validity of xLabels
        for (i = 1; i < data.xLabels.length; ++i)
            if (new Date(data.xLabels[i]).toString() == 'Invalid Date') {
                //@ts-ignore
                document.getElementById(elementId).innerHTML = 'The X Labels of the current Data Plugin is Not convertable to Time';
                return;
            }
        dataSeries.unshift(xSeries);
        c3.generate({
            bindto: '#' + elementId,
            data: {
                x: data.xLabels[0],
                //@ts-ignore
                columns: dataSeries
            },
            axis: {
                x: {
                    type: 'timeseries',
                }
            }
        });
    }
}

function init (): DisplayPlugin {
    return new timeSeries();
}
export { init }