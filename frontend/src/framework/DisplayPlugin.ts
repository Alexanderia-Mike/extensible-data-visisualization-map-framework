import { Framework } from './Framework';
import { StateData } from '../components/FrameworkState';

interface DisplayPlugin {
    /**
     * Called (only once) when the plug-in is first registered with the
     * framework, giving the plug-in a chance to perform any initial set-up
     * before the game has begun (if necessary).
     *
     * @param framework The {@link Framework} instance with which the plug-in
     *                  was registered.
     */
    onRegister: (framework: Framework) => void;

    /**
     * Gets the name of the display plugin.
     */
    getName: () => string

    /**
     * create a chart using the a state's data stored in a {@link StateData} instance, and insert that
     * chart in the HTML element defined by {@link elementId}. 
     * 
     * E.g. if `elementId = "chart"`, then the HTML element <div id="chart" />
     * should be replaced by the chart
     * 
     * In order to insert the chart to an html element, different display libraries have different 
     * approaches. For C3, for example, it is accomplished by specifiying "bindto" attribute in 
     * C3.generate method. See provided two displayplugins for detailed example.
     * 
     * @param elementId the id of the html element that should be replaced by
     *                  the chart.
     */
    loadChart(elementId: string, data: StateData | undefined): void;
}

export type { DisplayPlugin };