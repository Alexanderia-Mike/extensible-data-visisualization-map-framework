package edu.cmu.cs.cs214.hw6.framework.data;

/**
 * data for each state: values for x axis, and a serires of values for y axis
 */
public record StateData(String[] xLabels, DataSeries[] data) {}