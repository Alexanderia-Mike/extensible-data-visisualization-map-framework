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

import edu.cmu.cs.cs214.hw6.framework.data.DataSeries;
import edu.cmu.cs.cs214.hw6.framework.data.StateData;


public class PluginHelper {

    /**
     * connect with the API
     * @param URL_STR the API URI
     * @return the response body
     */
    public static String connect(String URL_STR) {
        try {
            // read the request body 
            HttpClient client = HttpClient.newHttpClient();       
            HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(URL_STR))
                .version(HttpClient.Version.HTTP_1_1)
                .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            return response.body();
        } catch (Exception e) {
            System.out.println("connect error: " + e.getMessage());
            return null;
        }
    }

    /**
     * parse the response returned by the API into Map<String,StateData>
     * note that the json format for APIs may vary, so you may have to modify this method when implementing your own plugin
     * @param response the response returned by the API
     * @param xName the name of x axis value in the json array
     * @param yLabels the names of y axis values in the json array
     * @return a map that stores the data for each state
     * @throws IOException
     * @throws InterruptedException
     */
    public static Map<String,StateData> parseJsonArray(String response,String xName, String[] yLabels) throws IOException, InterruptedException {
        JSONArray response_arr = new JSONArray(response);
        String states_str = new String(Files.readAllBytes(Paths.get("src/main/java/edu/cmu/cs/cs214/hw6/resources/US_STATE.json")));
        JSONObject states = new JSONObject(states_str);
        Map<String,StateData> dataMap = new HashMap<>();

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
                    xLabels[j+1] = values.getJSONObject(j).getString(xName);
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
                System.out.println(e.getMessage()+e.getCause());
                continue;
            }
        }
        return dataMap;
    }
}
