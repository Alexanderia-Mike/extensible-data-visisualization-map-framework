package edu.cmu.cs.cs214.hw6.dataplugin;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import org.json.JSONArray;
import org.json.JSONObject;

import edu.cmu.cs.cs214.hw6.framework.DataPlugin;
import edu.cmu.cs.cs214.hw6.framework.data.DataSeries;
import edu.cmu.cs.cs214.hw6.framework.data.StateData;


public class CovidPlugin implements DataPlugin {
    private String title;
    private static String key = "c7c8701bab9f48e593d60bca724f2b36"; //TODO: add your own API key here
    private static String URL_STR = "https://api.covidactnow.org/v2/states.timeseries.json?apiKey="+key;
    private static JSONArray response_arr;
    private Map<String,StateData> dataMap;
    private static String[] yLabels = new String[]{"testPositivityRatio",
        "caseDensity",
        "weeklyNewCasesPer100k",
        "contactTracerCapacityRatio",
        "infectionRate"};

    /**
     * parse the response returned by the API into Map<String,StateData>
     */
    public void parseResponse() throws IOException, InterruptedException {
        String states_str = new String(Files.readAllBytes(Paths.get("src/main/java/edu/cmu/cs/cs214/hw6/resources/US_STATE.json")));
        JSONObject states = new JSONObject(states_str);

        // parse json
        for (int i = 0; i < response_arr.length(); i++){
            String state_ansi = response_arr.getJSONObject(i).getString("state");
            try{
                String state_full = states.getString(state_ansi);
                JSONArray values = response_arr.getJSONObject(i).getJSONArray("metricsTimeseries");
                
                double[][] yValues = new double[yLabels.length][values.length()];
                String[] xLabels = new String[values.length()+1];
                xLabels[0] = "time";

                for(int j = 0;j<values.length();j++){
                    xLabels[j+1] = values.getJSONObject(j).getString("date");
                    for(int k=0;k<yLabels.length;k++){
                        try{
                            yValues[k][j] = values.getJSONObject(j).getDouble(yLabels[k]);
                        } catch(Exception e){
                            yValues[k][j] = 0.0;
                        }
                    }
                }
                DataSeries[] dataseries = new DataSeries[yLabels.length];
                for(int k=0;k<yLabels.length;k++){
                     dataseries[k] = new DataSeries(yLabels[k], yValues[k]);
                }
                dataMap.put(state_full,new StateData(xLabels, dataseries));
            } catch(Exception e){
                continue;
            }
        }
    }

    public CovidPlugin(){
        this.title = "Covid";
        this.dataMap = new HashMap<>();
    }

    /**
     * connect with the api
     * @return true if success, false otherwise
     */
    public boolean connect() {
        try {
            // read the request body 
            HttpClient client = HttpClient.newHttpClient();       
            HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(URL_STR))
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            response_arr = new JSONArray(response.body());
            return true;
        } catch (Exception e) {
            System.out.println("covidPlugin connect: " + e.getMessage());
            return false;
        }
    }

    /**
     * get a list of statistical data for each state. 
     * @return the map mapping each state to a {@link StateData} object
     */
    public Map<String, StateData> getData(){
        try {
            parseResponse();
        } catch (Exception e) {
            System.out.println("CovidPlugin parseResponse: " + e.getMessage());
        }
        return this.dataMap;
    }

    /**
     * get a title for the dataset
     * @return the title of the dataset
     */
    public String getTitle(){
        return this.title;
    }

    /**
     * disconnect with the api
     */
    public void disconnect(){}
}
