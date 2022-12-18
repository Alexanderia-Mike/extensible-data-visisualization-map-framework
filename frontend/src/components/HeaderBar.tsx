/**
 * the bar at the top of the page which provides all available dataplugins and displayplugins
 */

import React from 'react';

interface HeaderBarProp {
    displayPlugins: string[];
    dataPlugins: string[];
    currentDataPlugin: string | null;
    currentDisplayPlugin: string | null;
    dataClickHandlerGenerator: (name: string) => React.MouseEventHandler;
    displayClickHandlerGenerator: (name: string) => React.MouseEventHandler
}

interface PluginProp {
    name: string;
}

class HeaderBar extends React.Component<HeaderBarProp> {
    private createPlugins(plugin: string, idx: number, clickHandlerGenerator: (name: string) => React.MouseEventHandler, current: boolean): React.ReactNode {
        let className: string = 'pluginLink';
        if (current)
            className += 'Current';
        
        return (
            <div key={idx.toString()} className='pluginContainer'>
                <a className={className} href='/' onClick={current ? async (e: React.MouseEvent) => {e.preventDefault()} : clickHandlerGenerator(plugin)}>
                    <PluginButton name={plugin}></PluginButton>
                </a>
            </div>
        );
    }

    render(): React.ReactNode {
        return (
            <div id='headerBar'>
                <div id='dataPluginBar'>
                    <div className='pluginTitle'> Data Plugins: </div>
                    {this.props.dataPlugins.map(
                        (plugin, idx) => 
                        this.createPlugins(plugin, idx, this.props.dataClickHandlerGenerator, plugin==this.props.currentDataPlugin))}
                </div>
                <div id='displayPluginBar'>
                    <div className='pluginTitle'> Display Plugins: </div>
                    {this.props.displayPlugins.map(
                        (plugin, idx) => 
                        this.createPlugins(plugin, idx, this.props.displayClickHandlerGenerator, plugin==this.props.currentDisplayPlugin))}
                </div>
            </div>
        );
    }
}

class PluginButton extends React.Component<PluginProp> {
    render(): React.ReactNode {
        return (
            <div className='pluginButton'> {this.props.name} </div>
        );
    }
}

export { HeaderBar };