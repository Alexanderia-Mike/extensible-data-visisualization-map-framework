package edu.cmu.cs.cs214.hw6.dataplugin;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.json.JSONArray;
import org.json.JSONObject;

import edu.cmu.cs.cs214.hw6.framework.DataPlugin;
import edu.cmu.cs.cs214.hw6.framework.Framework;
import edu.cmu.cs.cs214.hw6.framework.data.DataSeries;
import edu.cmu.cs.cs214.hw6.framework.data.StateData;

public class TaxesPlugin implements DataPlugin {
    private static HttpClient client = HttpClient.newHttpClient();
    private static Map<String, StateDataTemp> stateDataTemp = new HashMap<>();

    private static class StateDataTemp {
        public List<String> xLabels;
        public List<Double> dataSeries;

        public StateDataTemp() {
            xLabels = new ArrayList<>();
            xLabels.add("fields");
            dataSeries = new ArrayList<>();
        }
    }

    /**
     * connect with the api
     * @return true if success, false otherwise
     */
    public boolean connect() {
        stateDataTemp = new HashMap<>();
        
        CompletableFuture<Void> future1 = null, future2 = null;
        try {
            future1 = getDataForTableAsync("SAGDP3N");
            future2 = getDataForTableAsync("SAGDP6N");
        } catch (Exception e) {
            System.out.println("TaxesPlugin getData: " + e.getMessage());
            return false;
        }

        try {
            CompletableFuture.allOf(future1, future2).join();
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    /**
     * get the data for a specific table from remote API
     * @param tableName[in] the table code
     * @return a future that will add all fetched data to {@link this.stateDataTemp} object.
     * @throws IOException 
     * @throws InterruptedException
     */
    private synchronized CompletableFuture<Void> getDataForTableAsync(String tableName) 
        throws IOException, InterruptedException {
        final String UserId = "95DAEAA7-05DD-4AC7-B007-3A43B3A6F450"; //TODO: add your own userid for the API
        HttpRequest request = HttpRequest.newBuilder(
                URI.create(
                    "https://apps.bea.gov/api/data?" + 
                    "UserID=" + UserId + 
                    "&method=getData&" +
                    "datasetname=Regional&" + 
                    "GeoFips=STATE&" + 
                    "LineCode=2&" + 
                    "Year=2020&" + 
                    "TableName=" + tableName
                )
            )
            .GET()
            .version(HttpClient.Version.HTTP_1_1)
            .build();

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        client = HttpClient.newBuilder().executor(executorService).build();
        CompletableFuture<HttpResponse<String>> responseFuture = client.sendAsync(request, HttpResponse.BodyHandlers.ofString());

        CompletableFuture<Void> retFuture = responseFuture.thenAccept(response -> {
            // parse json to get data array
            JSONObject obj = new JSONObject(response.body());
            String xLabel = obj.getJSONObject("BEAAPI")
                            .getJSONObject("Results")
                            .getString("PublicTable");
            JSONArray arr = obj.getJSONObject("BEAAPI")
                            .getJSONObject("Results")
                            .getJSONArray("Data");

            String stateName = "";
            for (int i = 0; i < arr.length(); ++i) {
                JSONObject stateData = arr.getJSONObject(i);
                stateName = stateData.getString("GeoName");

                if (Framework.testStateName(stateName) == false) {
                    continue;
                }
                String valString = stateData.getString("DataValue");
                float val = Float.parseFloat(String.join("", valString.split(",")));
                
                if (stateDataTemp.containsKey(stateName) == false)
                    stateDataTemp.put(stateName, new StateDataTemp());
                StateDataTemp state = stateDataTemp.get(stateName);
                state.xLabels.add(xLabel);
                state.dataSeries.add(Double.valueOf(val));
            }
        });
        
        return retFuture;
        
    }
    
    /**
     * get a list of statistical data for each state. 
     * @return the map mapping each state to a {@link StateData} object
     */
    public Map<String, StateData> getData() {
        Map<String, StateData> data = new HashMap<>();
        
        for (Entry<String, StateDataTemp> entry : stateDataTemp.entrySet()) {
            List<String> xLabels = entry.getValue().xLabels;
            List<Double> dataSeries = entry.getValue().dataSeries;
            data.put(
                entry.getKey(), 
                new StateData(
                    xLabels.toArray(new String[xLabels.size()]),
                    new DataSeries[] {
                        new DataSeries(
                            "Taxes (Thousands of Dollars)",
                            dataSeries.stream().mapToDouble(Double::doubleValue).toArray()
                        )
                    }
                )
            );
        }

        return data;
    }
    
    /**
     * get a title for the dataset
     * @return the title of the dataset
     */
    public String getTitle() {
        return "Taxes";
    }

    /**
     * disconnect with the api
     */
    public void disconnect() {}
}
