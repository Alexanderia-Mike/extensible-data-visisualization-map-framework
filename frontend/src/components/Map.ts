import L from 'leaflet';
import { statesData } from './us-states';
import { DisplayPlugin } from '../framework/DisplayPlugin';
import { StateData } from './FrameworkState';

/**
 * draw a new map according to the provided state data and display plugin
 * @param mapin old map object
 * @param mapContainer the html element that contains map
 * @param currentDisplayPlugin current display plugin
 * @param data the map that maps each state to a stateData object
 * @returns new map object
 */
function drawMap(mapin: any, mapContainer: any, currentDisplayPlugin: DisplayPlugin | null, data: Map<string, StateData> | null) {
    let map = mapin;
    if (map) {
        map = map.off();
        map = map.remove();
    }
    
    //@ts-ignore
    map = L.map(mapContainer).setView([37.8, -96], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var info = new L.Control();

    info.onAdd = function (map) {
        //@ts-ignore
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        //@ts-ignore
        this.update();
        //@ts-ignore
        return this._div;
    };

    function loadChart(state: string) {
        if (currentDisplayPlugin === null || data === null)
            return;
        currentDisplayPlugin.loadChart(state.split(' ').join('-') + '-chart', data.get(state));
    }
    
    // method that we will use to update the control based on feature properties passed
    //@ts-ignore
    info.update = function (props) {
        //@ts-ignore
        this._div.innerHTML = 
        currentDisplayPlugin ? 
            (props ? '<h4>' + props.name + '</h4>'
                : '<h4> No state selected </h4>') +  
            (props ? "<div id='" + props.name.split(' ').join('-') + "-chart" + "'></div>"
                : 'hover over a state')
        :
            '<h4> no display plugin selected </h4>';
        if (props)
            loadChart(props.name);
    };

    info.addTo(map);

    //@ts-ignore
    var geojsonLayer;
    
    //@ts-ignore
    function resetHighlight(e) {
        //@ts-ignore
        geojsonLayer.resetStyle(e.target);
        //@ts-ignore
        info.update();
    }

    //@ts-ignore
    function highlightFeature(e) {
        var layer = e.target;
    
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.3
        });
    
        layer.bringToFront();
        //@ts-ignore
        info.update(layer.feature.properties);
    }

    //@ts-ignore
    let zoomToFeature = e => {
        map.fitBounds(e.target.getBounds());
    };

    //@ts-ignore
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    //@ts-ignore
    function style() {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.3
        };
    }
    
    //@ts-ignore
    geojsonLayer = L.geoJson(statesData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);

    return map;
}

export { drawMap };