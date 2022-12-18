package edu.cmu.cs.cs214.hw6.framework;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import edu.cmu.cs.cs214.hw6.framework.data.StateData;

public class Framework {
    private List<DataPlugin> dataPlugins;
    private DataPlugin currentPlugin;

    /**
     * the set for all valid state names
     */
    private static final Set<String> stateNameSet = new HashSet<>(Arrays.asList(
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
        "Puerto"
    ));

    /**
     * create an empty framework
     */
    public Framework() {
        dataPlugins = new ArrayList<>();
        currentPlugin = null;
    }

    /**
     * Registers a new {@link DataPlugin} with the framework
     * @param plugin the data plugin to be registered
     */
    public void registerPlugin(DataPlugin plugin) {
        dataPlugins.add(plugin);
    }

    /**
     * @param dataPlugin the data plugin that provides the current data sources
     * @throws InterruptedException
     * @throws IOException
     */
    public void setDataSource(DataPlugin dataPlugin) {
        if (currentPlugin != null && currentPlugin != dataPlugin)
            currentPlugin.disconnect();
        
        boolean res = true;
        res = dataPlugin.connect();
        
        if (res == false) {
            System.out.println("connecting to data plugin " + dataPlugin.getTitle() + " fails");
            return;
        }
        currentPlugin = dataPlugin;
    }

    public void setPlugin(String s) {
        for(DataPlugin p:this.dataPlugins){
            if(s.equals(p.getTitle())){
                setDataSource(p);
                break;
            }
        }
    }

    /**
     * get the timestamped data in json format
     * @return the json formatted string representing both statistical data and corresponding time stamps
     */
    public String getDataJson() {
        if (currentPlugin == null) {
            return 
                "{" + 
                    "\"data\": {" + "}, " +
                    "\"dataPlugins\": " + Arrays.toString(dataPlugins.stream().map((DataPlugin s) -> "\"" + s.getTitle() + "\"").toArray()) + ", " + 
                    "\"currentDataPlugin\": \"" + "null" + "\"" +
                "}";
        }
        
        Map<String, StateData> state = null;
        state = currentPlugin.getData();

        return "{" + 
                "\"data\": " + Framework.StateToJson(state) + ", " +
                "\"dataPlugins\": " + Arrays.toString(dataPlugins.stream().map((DataPlugin s) -> "\"" + s.getTitle() + "\"").toArray()) + ", " + 
                "\"currentDataPlugin\": \"" + currentPlugin.getTitle() + "\"" +
               "}";
    }

    public static boolean testStateName(String stateName) {
        return stateNameSet.contains(stateName);
    }

    public static String StateToJson(Map<String, StateData> state) {
        if (state == null) {
            return "\"null\"";
        }
        if (state.entrySet().size() == 0) {
            return "{}";
        }
        
        String mapString = "";
        for (Map.Entry<String, StateData> entry : state.entrySet()) {
            if (stateNameSet.contains(entry.getKey()) == false)
                continue;
            
            mapString += (
                "\"" + entry.getKey() + "\": " +
                "{ \"xLabels\": " + Arrays.toString(Arrays.asList(entry.getValue().xLabels()).stream().map((String s) -> ("\"" + s + "\"")).toArray()) + ", " + 
                    "\"data\": " + 
                    Arrays.toString(Arrays.asList(entry.getValue().data()).stream().map(ds -> "{\"label\": \"" + ds.label() + "\", " + "\"data\": " + Arrays.toString(ds.data()) + "}").toArray()) +
                    "" + 
                "}, "
            );
        }
        mapString = mapString.substring(0, mapString.length() - 2);

        return "{" + mapString + "}";
    }
}
