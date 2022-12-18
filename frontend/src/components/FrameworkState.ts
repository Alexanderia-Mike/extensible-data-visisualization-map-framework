/**
 * the state interface for framework component
 */
interface FrameworkState {
    data: Map<string, StateData> | null;    // maps each state to a data object
    dataPlugins: string[];                  // the array of loaded dataPlugins
    currentDataPlugin: string | null;       // the current selected dataPlugin
}

/**
 * list of all states
 */
enum STATE {
    "Alabama" = "Alabama",
    "Alaska" = "Alaska",
    "Arizona" = "Arizona",
    "Arkansas" = "Arkansas",
    "California" = "California",
    "Colorado" = "Colorado",
    "Connecticut" = "Connecticut",
    "Delaware" = "Delaware",
    "District" = "District",
    "Florida" = "Florida",
    "Georgia" = "Georgia",
    "Hawaii" = "Hawaii",
    "Idaho" = "Idaho",
    "Illinois" = "Illinois",
    "Indiana" = "Indiana",
    "Iowa" = "Iowa",
    "Kansas" = "Kansas",
    "Kentucky" = "Kentucky",
    "Louisiana" = "Louisiana",
    "Maine" = "Maine",
    "Maryland" = "Maryland",
    "Massachusetts" = "Massachusetts",
    "Michigan" = "Michigan",
    "Minnesota" = "Minnesota",
    "Mississippi" = "Mississippi",
    "Missouri" = "Missouri",
    "Montana" = "Montana",
    "Nebraska" = "Nebraska",
    "Nevada" = "Nevada",
    "New Hampshire" = "New Hampshire",
    "New Jersey" = "New Jersey",
    "New Mexico" = "New Mexico",
    "New York" = "New York",
    "North Carolina" = "North Carolina",
    "North Dakota" = "North Dakota",
    "Ohio" = "Ohio",
    "Oklahoma" = "Oklahoma",
    "Oregon" = "Oregon",
    "Pennsylvania" = "Pennsylvania",
    "Rhode Island" = "Rhode Island",
    "South Carolina" = "South Carolina",
    "South Dakota" = "South Dakota",
    "Tennessee" = "Tennessee",
    "Texas" = "Texas",
    "Utah" = "Utah",
    "Vermont" = "Vermont",
    "Virginia" = "Virginia",
    "Washington" = "Washington",
    "West Virginia" = "West Virginia",
    "Wisconsin" = "Wisconsin",
    "Wyoming" = "Wyoming",
    "Puerto" = "Puerto"
}

interface StateData {
    // state: STATE;
    xLabels: string[];  // a string array containing x labels
    data: DataSeries[]; // an array of DataSeries
}

/**
 * an interface for data series. Each stateData could have multiple data Series
 */
interface DataSeries {
    label: string;  // the meaning of this data series
    data: number[]; // the values
}

/**
 * convert a json object to a map
 * @param json a json object obtained by response.json() method
 * @returns a map that maps each attribute in {@link json} to its value
 */
function jsonDataToMap(json: any): Map<string, StateData> {
    let map = new Map<string, StateData>();
    map.set("Alabama", json["Alabama"]);
    map.set("Alaska", json["Alaska"]);
    map.set("Arizona", json["Arizona"]);
    map.set("Arkansas", json["Arkansas"]);
    map.set("California", json["California"]);
    map.set("Colorado", json["Colorado"]);
    map.set("Connecticut", json["Connecticut"]);
    map.set("Delaware", json["Delaware"]);
    map.set("District", json["District"]);
    map.set("Florida", json["Florida"]);
    map.set("Georgia", json["Georgia"]);
    map.set("Hawaii", json["Hawaii"]);
    map.set("Idaho", json["Idaho"]);
    map.set("Illinois", json["Illinois"]);
    map.set("Indiana", json["Indiana"]);
    map.set("Iowa", json["Iowa"]);
    map.set("Kansas", json["Kansas"]);
    map.set("Kentucky", json["Kentucky"]);
    map.set("Louisiana", json["Louisiana"]);
    map.set("Maine", json["Maine"]);
    map.set("Maryland", json["Maryland"]);
    map.set("Massachusetts", json["Massachusetts"]);
    map.set("Michigan", json["Michigan"]);
    map.set("Minnesota", json["Minnesota"]);
    map.set("Mississippi", json["Mississippi"]);
    map.set("Missouri", json["Missouri"]);
    map.set("Montana", json["Montana"]);
    map.set("Nebraska", json["Nebraska"]);
    map.set("Nevada", json["Nevada"]);
    map.set("New Hampshire", json["New Hampshire"]);
    map.set("New Jersey", json["New Jersey"]);
    map.set("New Mexico", json["New Mexico"]);
    map.set("New York", json["New York"]);
    map.set("North Carolina", json["North Carolina"]);
    map.set("North Dakota", json["North Dakota"]);
    map.set("Ohio", json["Ohio"]);
    map.set("Oklahoma", json["Oklahoma"]);
    map.set("Oregon", json["Oregon"]);
    map.set("Pennsylvania", json["Pennsylvania"]);
    map.set("Rhode Island", json["Rhode Island"]);
    map.set("South Carolina", json["South Carolina"]);
    map.set("South Dakota", json["South Dakota"]);
    map.set("Tennessee", json["Tennessee"]);
    map.set("Texas", json["Texas"]);
    map.set("Utah", json["Utah"]);
    map.set("Vermont", json["Vermont"]);
    map.set("Virginia", json["Virginia"]);
    map.set("Washington", json["Washington"]);
    map.set("West Virginia", json["West Virginia"]);
    map.set("Wisconsin", json["Wisconsin"]);
    map.set("Wyoming", json["Wyoming"]);
    map.set("Puerto", json["Puerto"]);

    return map;
}

export type { StateData, FrameworkState };
export { STATE, jsonDataToMap };