import { DisplayPlugin } from './framework/DisplayPlugin';
// import { promises as fs } from 'fs';
// import path from 'path';

import plugins from './resources/displayplugins.json';

import {Promise} from 'es6-promise';

/**
 * assumes that {@link plugins.plugins} contains all the required file names for display plugins,
 * and assume all those files can be found in the target directories and are modules
 * which export an init function to create a displayPlugin object
 *
 * returns a promise with all the plugins
 *
 * @param targetDir where to look for plugins
 * @returns a promise with all plugins
 */
async function loadPlugins (targetDir: string): Promise<DisplayPlugin[]> {
    //@ts-ignore
    async function getModules(callback: any): void {
        let modules: any[] = [];
        for (let plugin of plugins.plugins) {
            modules.push(await import('./' + targetDir + '/' + plugin));
        }
        callback(modules);
    }

    let modulesPr = new Promise((resolve, reject) => {
        getModules((modules: any)=>{
            resolve(modules);
        });
    });

    return await modulesPr.then(modules =>
            // @ts-ignore
            modules.filter(m => typeof m.init === 'function').map(m => m.init() as DisplayPlugin)
    );
}

export { loadPlugins }
