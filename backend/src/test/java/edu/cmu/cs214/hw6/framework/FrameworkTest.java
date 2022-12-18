package edu.cmu.cs214.hw6.framework;

import java.io.IOException;
import java.io.PrintWriter;

import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import edu.cmu.cs.cs214.hw6.dataplugin.CovidPlugin;
import edu.cmu.cs.cs214.hw6.dataplugin.TaxesPlugin;
import edu.cmu.cs.cs214.hw6.framework.DataPlugin;
import edu.cmu.cs.cs214.hw6.framework.Framework;
import edu.cmu.cs.cs214.hw6.framework.data.DataSeries;
import edu.cmu.cs.cs214.hw6.framework.data.StateData;

public class FrameworkTest {
    @Test
    public void shouldReturnCorrectlyFormattedJson() throws IOException, InterruptedException
    {
        Framework fr = new Framework();
        Map<String, StateData> state = new HashMap<>();
        state.put(
            "Michigan", 
            new StateData(
                new String[]{"time", "2022-12-1", "2022-12-31"}, 
                new DataSeries[]{
                    new DataSeries("positive", new double[]{2, 3}),
                    new DataSeries("death", new double[]{4, 5})
                }
            )
        );
        state.put(
            "Wisconsin", 
            new StateData(
                new String[]{"time", "2021-12-1", "2021-12-31"}, 
                new DataSeries[]{
                    new DataSeries("positive", new double[]{6, 7}),
                    new DataSeries("death", new double[]{8, 9})
                }
            )
        );
        DataPlugin p1 = new CovidPlugin();
        DataPlugin p2 = new TaxesPlugin();
        fr.registerPlugin(p1);
        fr.registerPlugin(p2);
        fr.setDataSource(p1);

        System.out.println(Framework.StateToJson(state));
    }
    @Test
    public void pluginTest() throws IOException, InterruptedException{
        CovidPlugin c1 = new CovidPlugin();
        Framework fr = new Framework();
        fr.registerPlugin(c1);
        fr.setDataSource(c1);
        
        try (PrintWriter out = new PrintWriter(c1.getTitle() + ".json")) {
            out.println(fr.getDataJson());
        }
    }
}
