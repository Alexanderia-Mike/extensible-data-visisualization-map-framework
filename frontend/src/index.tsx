import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { DisplayPlugin } from './framework/DisplayPlugin';
import { loadPlugins } from './pluginloader';

const PLUGIN_DIR = 'displayplugin'

let registeredPlugins: DisplayPlugin[] = [];
const pluginsPromise = loadPlugins(PLUGIN_DIR)
pluginsPromise.then(ps => {
    ps.forEach(p => {
        console.log('Registering plugin ' + p.getName())
        registeredPlugins.push(p);
    });
    root.render(
        <React.StrictMode>
            <App registeredPlugins={registeredPlugins} />
        </React.StrictMode>
    );
}).catch(e => console.error(`Failed to load plugins: ${e}`))

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <App registeredPlugins={registeredPlugins} />
    </React.StrictMode>
);
