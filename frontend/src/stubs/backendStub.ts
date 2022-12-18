import { FrameworkState, StateData } from "../components/FrameworkState";

class backendStub {
    private INITIAL_STATE: FrameworkState;
    constructor() {
        let map = new Map<string, StateData>();
        map.set("Alabama", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [13, 14]}]});
        map.set("Alaska", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Arizona", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Arkansas", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("California", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Colorado", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Connecticut", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Delaware", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("District", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Florida", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Georgia", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Hawaii", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Idaho", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Illinois", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Indiana", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Iowa", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Kansas", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Kentucky", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Louisiana", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Maine", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Maryland", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Massachusetts", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Michigan", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [23, 24]}]});
        map.set("Minnesota", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Mississippi", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Missouri", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Montana", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Nebraska", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Nevada", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("New Hampshire", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("New Jersey", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("New Mexico", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("New York", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("North Carolina", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("North Dakota", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Ohio", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Oklahoma", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Oregon", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Pennsylvania", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [33, 34]}]});
        map.set("Rhode Island", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("South Carolina", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("South Dakota", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Tennessee", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Texas", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Utah", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Vermont", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Virginia", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Washington", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("West Virginia", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Wisconsin", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [43, 44]}]});
        map.set("Wyoming", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});
        map.set("Puerto", {xLabels: ['time', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [3, 4]}]});

        this.INITIAL_STATE = {
            data: map,
            dataPlugins: ['first', 'second'],
            currentDataPlugin: null
        };
    }

    public fetch(url: string): string {
        if (url.startsWith('/setDataPlugin')) {
            let start = url.indexOf('=');
            if (start === -1)
                return '';
            let dataPlugin = url.substring(start + 1);
            if (dataPlugin === 'first') {
                this.INITIAL_STATE.currentDataPlugin = 'first';
                this.INITIAL_STATE.data?.set('Wisconsin', {xLabels: ['time1', '2022-1-1', '2022-2-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [43, 44]}]});
            } else if (dataPlugin === 'second'){
                this.INITIAL_STATE.currentDataPlugin = 'second';
                this.INITIAL_STATE.data?.set('Wisconsin', {xLabels: ['time2', '2022-3-1', '2022-4-1'], data: [{label: 'data1', data: [1, 2]}, {label: 'data2', data: [43, 44]}]});
            } else {
                console.log("not found!");
            }
        } else if (url.startsWith('/getInitial')) {
            this.INITIAL_STATE.dataPlugins = ['first', 'second'];
        }
        return this.toString(this.INITIAL_STATE);
    }

    private toString(state: FrameworkState): string {
        let mapString: string = '';
        if (state.data === null)
            mapString += 'null';
        else {
            // @ts-ignore
            for (let entry of state.data.entries()) {
                mapString += (
                    "\"" + entry[0] + "\": " +
                    "{ \"xLabels\": [" + entry[1].xLabels.map((s: string) => "\"" + s + "\"").toString() + "], " + 
                      "\"data\": [" + 
                        //@ts-ignore
                        entry[1].data.map(ds => {
                            return "{\"label\": \"" + ds.label + "\", " +
                                    "\"data\": [" + ds.data.toString() + "]}"
                        }) +
                      "]" + 
                    "}, "
                );
            }
            mapString = mapString.slice(0, -2);
        }
        return "{" + 
                "\"data\": {" + mapString + "}, " +
                "\"dataPlugins\": [" + state.dataPlugins.map(s => "\"" + s + "\"") + "], " + 
                "\"currentDataPlugin\": \"" + state.currentDataPlugin + "\"" +
               "}";
    }
}

export { backendStub };