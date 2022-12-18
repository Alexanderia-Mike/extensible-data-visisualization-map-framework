package edu.cmu.cs214.hw6.dataplugin;
import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

import edu.cmu.cs.cs214.hw6.dataplugin.TaxesPlugin;
import edu.cmu.cs.cs214.hw6.framework.Framework;

public class TaxesPluginTest {
    private TaxesPlugin plugin;

    @Before
    public void setUp(){
        plugin=new TaxesPlugin();
    }

    @Test
    public void testConnect() throws IOException, InterruptedException {
        assertTrue(plugin.connect());
    }

    @Test
    public void printResponse() {
        Framework fr = new Framework();
        fr.registerPlugin(plugin);
        fr.setDataSource(plugin);

        System.out.println(Framework.StateToJson(plugin.getData()));
    }
}
