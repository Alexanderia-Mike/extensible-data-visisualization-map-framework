import React from 'react';

import '../App.css'; // import the css file to enable your styles.
import 'c3/c3.min.css';

import { drawMap } from '../components/Map';
import { DisplayPlugin } from './DisplayPlugin';
import { HeaderBar } from '../components/HeaderBar';
import { FrameworkState, jsonDataToMap } from '../components/FrameworkState';

interface Props {
    registeredPlugins: DisplayPlugin[];
}

class Framework extends React.Component<Props, FrameworkState> {
    //@ts-ignore
    private mapContainer;   // the html element that contains the map. Initialized in render() method
    //@ts-ignore
    private map;            // the map instance
    private currentDisplayPlugin: DisplayPlugin | null; // current selected display plugin

    constructor(props: Props) {
        super(props);
        this.mapContainer = null;
        this.map = null;
        this.currentDisplayPlugin = null;
        this.state = {
            data: null,
            dataPlugins: [],
            currentDataPlugin: null
        };

        for (let p of props.registeredPlugins) {
            p.onRegister(this);
        }
    }

    /**
     * get the instance of the display by its name.
     * @param plugin the name of the required display plugin
     * @returns an object of the display plugin whose name matches {@link plugin}, 
     *          or null if {@link plugin} does not match any existing display plugins.
     */
    private getDisplayPlugin = (plugin: string | null): DisplayPlugin | null => {
        if (plugin === null)
            return null;
        for (let p of this.props.registeredPlugins) {
            if (p.getName() === plugin)
                return p;
        }
        return null;
    }

    /**
     * This function will call after the HTML is rendered.
     */
    componentDidMount(): void {
        this.initialize();
    }
    
    /**
     * initialize the framework by fetching all the existing data plugins
     */
    private async initialize() {
        // const json = JSON.parse(await new backendStub().fetch('/getInitial'));
        const response = await fetch('/getInitial');
        const json = await response.json();
        this.setState(json);
    }

    /**
     * a generator that generates mouse click handlers for data plugin buttons
     * @param plugin the name of the data plugin
     * @returns a mouse event handler that sets the current data plugin to the one that
     *          matches {@link plugin}
     */
    private dataPluginHandlerGenerator = (plugin: string) => {
        return async (e: React.MouseEvent) => {
            e.preventDefault();
            const response = await fetch(`/setDataPlugin?name=${plugin}`);
            const json = await response.json();
            this.setState(this.jsonToState(json));
        }
    }
    
    /**
     * a generator that generates mouse click handlers for display plugin buttons
     * @param plugin the name of the display plugin
     * @returns a mouse event handler that sets the current display plugin to the one
     *          that matches {@link plugin}
     */
    private displayPluginHandlerGenerator = (plugin: string) => {
        return async (e: React.MouseEvent) => {
            e.preventDefault();
            this.currentDisplayPlugin = this.getDisplayPlugin(plugin);
            this.forceUpdate();
        }
    }

    /**
     * convert a json object to a FrameworkState object
     * @param json an object converted from the json string provided by backend
     * @returns a FrameworkState object that matches all the information contained
     *          by {@link json}
     */
    private jsonToState = (json: any): FrameworkState => {
        let state: FrameworkState = {
            data: null,
            dataPlugins: [],
            currentDataPlugin: null
        };
        state.currentDataPlugin = json.currentDataPlugin;
        for (let p of json.dataPlugins)
            state.dataPlugins.push(p);
            
        state.data = jsonDataToMap(json.data);
        return state;
    }

    /**
     * render the main page
     */
    render(): React.ReactNode {
        if (this.mapContainer)
            this.map = drawMap(
                this.map, 
                this.mapContainer, 
                this.currentDisplayPlugin,
                this.state.data
            );
        return (
            <div>
                <div id='pageTitle'> Interactive US Map Framework </div>
                <div id='mapContainer'>
                    <div id='map' ref={el => this.mapContainer = el}/>
                </div>
                <HeaderBar 
                    displayPlugins={this.props.registeredPlugins.map(p => p.getName())} 
                    dataPlugins={this.state.dataPlugins}
                    currentDataPlugin={this.state.currentDataPlugin}
                    currentDisplayPlugin={this.currentDisplayPlugin === null ? null : this.currentDisplayPlugin.getName()}
                    dataClickHandlerGenerator={this.dataPluginHandlerGenerator}
                    displayClickHandlerGenerator={this.displayPluginHandlerGenerator}
                ></HeaderBar>
            </div>
        );
    }
}

export { Framework };