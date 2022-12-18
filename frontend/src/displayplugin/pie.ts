/**
 * draw the provided data in a pie chart
 */
import { DisplayPlugin } from "../framework/DisplayPlugin";
import { Framework } from "../framework/Framework";
import { StateData } from "../components/FrameworkState";

import c3 from 'c3';

class pie implements DisplayPlugin {
    private static UPPER_LIMIT = 10;

    onRegister (framework: Framework): void {}

    getName(): string {
        return "Pie Chart";
    }

    /**
     * if {@link data.xLabels.length} is larger than {@link pie.UPPER_LIMIT}, then only first {@link pie.UPPER_LIMIT}
     * data values is kept. 
     * If {@link data.data.length} is more than 1, only the first dataSeries is kept
     */
    loadChart(elementId: string, data: StateData | undefined): void {
        if (data === undefined)
            return;
        
        let title: string = data.xLabels[0];
        let xLabels: string[] = data.xLabels.slice(1);

        // if no values, return
        if (data.data.length == 0)
            return;
        // load the first set of dataseries only in pie chart
        let dataList = data.data[0];
        if (xLabels.length != dataList.data.length) {
            console.log('error: provided xLabels do not have the same length with data');
            return;
        }
        
        let cuttedData: number[];
        if (xLabels.length > pie.UPPER_LIMIT) {
            xLabels = xLabels.slice(xLabels.length - pie.UPPER_LIMIT);
            cuttedData = dataList.data.slice(dataList.data.length - pie.UPPER_LIMIT);
            console.log("data too large; cut down to " + pie.UPPER_LIMIT);
        } else {
            cuttedData = dataList.data;
        }
        let dataSeries: (string | number)[][] = xLabels.map((s: string) => [s]);
        let i = 0;
        for (let value of cuttedData) {
            dataSeries[i].push(value);
            i ++;
        }
        title = dataList.label + ' on different ' + title;

        c3.generate({
            bindto: '#' + elementId,
            data: {
                //@ts-ignore
                columns: dataSeries,
                type: 'donut',
            },
            donut: {
                title: title
            }
        });
    }
}

function init (): DisplayPlugin {
    return new pie();
}
export { init }