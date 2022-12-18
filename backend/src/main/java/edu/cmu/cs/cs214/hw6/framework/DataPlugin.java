package edu.cmu.cs.cs214.hw6.framework;

import java.util.Map;

import edu.cmu.cs.cs214.hw6.framework.data.StateData;

public interface DataPlugin {
    /**
     * connect with the data source api
     * @return true if success, false otherwise
     */
    public boolean connect();
    
    /**
     * get a map that stores the statistical data for each state. 
     */
    public Map<String, StateData> getData();
    
    /**
     * get a title for the plugin, which will be displayed at frontend
     * @return the title of the plugin
     */
    public String getTitle();

    /**
     * disconnect with the data source api
     */
    public void disconnect();
}
