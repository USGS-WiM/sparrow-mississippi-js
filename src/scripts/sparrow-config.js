/*
Created By Erik Myers 8/16/2018
CONFIG FILE FOR USE WITH SPARROW-Midcontinental

THIS CONFIG REMOVES CATCHMENT AND AGGREGATE LABELS FROM THE CHARTOUTFIELS OBJECTS TO SHORTEN CHART AND DISPLAYED METRIC LABELS.
ALSO uses SPARROWID and ST_SPARRID in place of COMID, ST_COMID
*/

var appTitle =
  "2012 SPARROW Models for Mississippi: Total Phosphorus, Total Nitrogen, Suspended Sediment, and Streamflow";
var appVersion = "v0.9.0"; // could pull this from code/package.json

var serviceBaseURL =
  "https://gis1.wim.usgs.gov/server/rest/services/Sparrow/SparrowMississippiUpdated/MapServer/"; //important! UPDATE rest service URL
var chartUnits = " (kg/yr.)";
var chartFeatureMax = 2500; //chart will not be available if more than this many polygons are showing on map.

var groupResultsInitIndex = 0; //sets the default layer for the application.  In this case service layer 1 == HUC8.

var splitLayers = [4, 5, 6, 11, 12, 13, 18, 19, 20, 25, 26, 27]; //important! UPDATE layer Ids of all state split layers (st_cats, sg3, sg2, sg1)

var mapCenter = [-89.5, 33.9];
//app.defaultMapCenter = [-87, 42];
defaultZoomLevel = 6;

borderThreshold = 10; //dynamic polygon border threshold.  When zoomed beyond this number borders appear
var dynamicBorderLayers = [
  "Catchment",
  "12-Digit hydrologic unit code",
  "8-Digit hydrologic unit code",
]; //Aggregate layer choices placed in this array will have dynamic borders.  Each string MUST MATCH the text in the Group Results By Select to work.

var initQueryParams = ["ST", "GP2", "GP1"]; //used to query for the AOI dropdown values on app init.

//used to set dynamic labels in chart
var groupResultsLabels = {
  a: "Catchment ID",
  b: "12-Digit hydrologic unit code",
  c: "8-Digit hydrologic unit code",
  d: "State",
};

//download locations
var rootURL = "https://sparrow.wim.usgs.gov/sparrow-mississippi/downloads/";
var phosphorusShapefileURL = rootURL + "MS_Phosphorus.zip";
var streamflowShapefileURL = rootURL + "MS_Streamflow.zip";
var sedimentShapefileURL = rootURL + "MS_Sediment.zip";
var nitrogenShapefileURL = rootURL + "MS_Nitrogen.zip";
//calibration sites for Mississippi app are included in full download
/* var phosCalibrationURL = rootURL + "MS_calibration_sites_tp.zip";
var nitroCalibrationURL = rootURL + "MS_calibration_sites_tn.zip";
var streamflowCalibrationURL = rootURL + "MS_calibration_sites_q.zip";
var sedimentCalibrationURL = rootURL + "MS_calibration_sites_ss.zip"; */

var tableOutFields = [
  { field: "FID", name: "Unique Feature Id" },
  { field: "GRP1", name: "8-Digit Hydrologic Unit Code" },
  { field: "GRP2", name: "12-Digit Hydrologic Unit Code" },
  { field: "GRP_3_NA_1", name: "Join Field" },
  { field: "Area_g3", name: "HUC12 area (mi2)" },
];

var stateTableOutFields = [
  { field: "FID", name: "Unique Feature Id" },
  { field: "ST_GP3_NAM", name: "HUC12/State (combination) ID" },
  {
    field: "Area_S3",
    name: "HUC12 area within the state and the  model area (mi2)",
  },
  { field: "ST", name: "State" },
  {
    field: "GRP_1_NAM",
    name: "Independent Watershed name (in which HUC4 is nested)",
  },
  { field: "GP2", name: "HUC8 (in which HUC8 is nested)" },
  { field: "GRP_3_NAM", name: "HUC12" },
  { field: "ST_GP1_NAM", name: "State and Independent Watershed" },
  { field: "ST_GP2_NAM", name: "State and HUC8" },
  { field: "ST_gp3_n_1", name: "Join Field" },
];

var aggregateDefinitions = {
  st: "State",
  gp1: "8-Digit hydrologic unit code",
  gp2: "12-Digit hydrologic unit code",
  sg1: "State_HUC8",
  sg2: "State_HUC12",
};

// key, value pairs come from PHOSPHORUS attribute definitions Excel file
var catchmentDefinitions = {
  comid: "SPARROW Reach ID",
  st_comid: "SPARROW Reach by State",
  pname: "Catchment Name",
  accl: "Accumulated load (kg)",
  concentrat: "Concentration, mg/L",
  incl: "Incremental load (kg)",
  accy: "Accumulated yield (kg/km2)",
  incy: "Incremental yield (kg/km2)",
  daccl: "Delivered accumulated load (kg)",
  daccy: "Delivered accumulated yield (kg/km2)",
  dincl: "Delivered incremental load  (kg)",
  dincy: "Delivered incremental yield (kg/km2)",
};

//Nitrogen same as Phosphorus in this model
var catchmentDefinitions_tn = {
  comid: "SPARROW Reach ID ",
  st_comid: "SPARROW Reach ID by State",
  pname: "Catchment Name",
  accl: "Accumulated load (kg)",
  concentrat: "Concentration, mg/L",
  incl: "Incremental load (kg)",
  accy: "Accumulated yield (kg/km2)",
  incy: "Incremental yield (kg/km2)",
  daccl: "Delivered accumulated load (kg)",
  daccy: "Delivered accumulated yield (kg/km2)",
  dincl: "Delivered incremental load  (kg)",
  dincy: "Delivered incremental yield (kg/km2)",
};

var catchmentDefinitions_q = {
  comid: "SPARROW Reach ID ",
  st_comid: "SPARROW Reach ID by State",
  pname: "Catchment Name",
  accl: "Accumulated streamflow (cfs)",
  incl: "Incremental streamflow (cfs)",
  accy: "Accumulated yield (mm/yr)",
  incy: "Incremental yield (mm/yr)",
  daccl: "Delivered accumulated flow (cfs)",
  daccy: "Delivered accumulated yield (mm/yr)",
  dincl: "Delivered incremental flow (cfs)",
  dincy: "Delivered incremental yield (mm/yr)",
};

var catchmentDefinitions_ss = {
  comid: "SPARROW Reach ID ",
  st_comid: "SPARROW Reach ID by State",
  pname: "Catchment Name",
  accl: "Accumulated load (MT)",
  concentrat: "Concentration, mg/L",
  incl: "Incremental load (MT)",
  accy: "Accumulated yield (MT/km2)",
  incy: "Incremental yield (MT/km2)",
  daccl: "Delivered accumulated load (MT)",
  daccy: "Delivered accumulated yield (MT/km2)",
  dincl: "Delivered incremental load  (MT)",
  dincy: "Delivered incremental yield (MT/km2)",
};

var mappedDefinitions = {
  area: "Aggregated area (km2)",
  al: "Aggregated load (kg)",
  ay: "Aggregated yield (kg/km2)",
  dal: "Delivered aggregated load (kg)",
  day: "Delivered aggregated yield (kg/km2)",
};

var mappedDefinitions_q = {
  area: "Aggregated area (km2)",
  al: "Aggregated streamflow (cfs)",
  ay: "Aggregated yield (mm/yr)",
  dal: "Delivered aggregated streamflow (cfs)",
  day: "Delivered aggregated yield (mm/yr)",
};

var mappedDefinitions_ss = {
  area: "Aggregated area (km2)",
  al: "Aggregated load (MT)",
  ay: "Aggregated yield (MT/km2)",
  dal: "Delivered aggregated load (MT)",
  day: "Delivered aggregated yield (MT/km2)",
};

/***UPDATE IMPORTANT! complete with source data Excel key***/
var phosphorusSourceDefinitions = {
  s1: "Natural Sources",
  s2: "Urban Land",
  s3: "Farm Fertilizer and Manure",
};

/***UPDATE IMPORTANT! complete with source data Excel key***/
var nitrogenSourceDefinitions = {
  s1: "Sewerage Point Sources",
  s2: "Urban Land",
  s3: "Farm Fertilizer",
  s4: "Manure",
  s5: "Atmospheric Deposition",
};

/***UPDATE IMPORTANT! complete with source data Excel key***/
var streamflowSourceDefinitions = {
  s1: "Precipitation minus Actual ET",
  s2: "Sewerage discharge, external sources",
  s3: "Diversions into area",
  s4: "Springs",
  s5: "Canada",
};

var sedimentSourceDefinitions = {
  s1: "Urban-Medium/Coarse",
  s2: "Urban-Colluvium/Residuum/Carbonate",
  s3: "Urban-Fine/Silt",
  s4: "Agriculture-Medium/Coarse",
  s5: "Agriculture-Colluvium/Residuum/Carbonate",
  s6: "Agriculture-Fine/Silt",
  s7: "Natural/Other-Medium/Coarse",
  s8: "Natural/Other-Colluvium/Residuum/Carbonate",
  s9: "Natural/Other-Fine/Silt",
  s10: 'All Landuses-"Other" Geology',
  s11: "Canada",
  s12: "Channel Sources",
  s13: "Urban Land and Alluvium and residuum in very fine-grained sedimentary rock and igneous and metamorphic rock",
  s14: "Urban Land and Residuum in sedimentary rock (discontinuous)",
  s15: "Urban Land and Fine- and medium-grained sediments, residuum in alluvium,  and residuum in carbonate and fine-grained sedimentary rock",
  s16: "Agricultural Land and Alluvium and residuum in very fine-grained sedimentary rock and igneous and metamorphic rock",
  s17: "Agricultural Land and Residuum in sedimentary rock (discontinuous)",
  s18: "Agricultural Land and Fine- and medium-grained sediments, residuum in alluvium,  and residuum in carbonate and fine-grained sedimentary rock",
  s19: "Transitional Land and Alluvium and residuum in very fine-grained sedimentary rock and igneous and metamorphic rock",
  s20: "Transitional Land and Residuum in sedimentary rock (discontinuous)",
  s21: "Transitional Land and Fine- and medium-grained sediments, residuum in alluvium, and residuum in carbonate and fine-grained sedimentary rock",
  s22: "Forested Land and all surficial geology classes",
};

/* var sedimentSourceDefinitions_DAL = {
  s1: "Urban Land and Alluvium and residuum in very fine- grained sedimentary rock and igneous and metamorphic rock",
  s2: "Urban Land and Residuum in sedimentary rock(discontinuous)",
  s3: "Urban Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  s4: "Agricultural Land and Alluvium and residuum in very fine - grained sedimentary rock and igneous and metamorphic rock",
  s5: "Agricultural Land and Residuum in sedimentary rock(discontinuous)",
  s6: "Agricultural Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  s7: "Transitional Land and Alluvium and residuum in very fine - grained sedimentary rock and igneous and metamorphic rock",
  s8: "Transitional Land and Residuum in sedimentary rock(discontinuous)",
  s9: "Transitional Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  s0: "Forested Land and all surficial geology classes",
  10: "Channel Sources",
};

var sedimentSourceDefinitions_DAY = {
  s1: "Urban Land and Alluvium and residuum in very fine- grained sedimentary rock and igneous and metamorphic rock",
  s2: "Urban Land and Residuum in sedimentary rock(discontinuous)",
  s3: "Urban Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  s4: "Agricultural Land and Alluvium and residuum in very fine - grained sedimentary rock and igneous and metamorphic rock",
  s5: "Agricultural Land and Residuum in sedimentary rock(discontinuous)",
  s6: "Agricultural Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  s7: "Transitional Land and Alluvium and residuum in very fine - grained sedimentary rock and igneous and metamorphic rock",
  s8: "Transitional Land and Residuum in sedimentary rock(discontinuous)",
  s9: "Transitional Land and Fine - and medium - grained sediments, residuum in alluvium, and residuum in carbonate and fine - grained sedimentary rock",
  11: "Forested Land and all surficial geology classes",
  12: "Channel Sources",
}; */

/**get the HEX values below from project Google Doc and make sure:  
    1. each color corresponds with the order of SourceDefinitions objects above  
    2. there the number of hex colors matches the number of nutrient sources
    3. find coordinating colors (using some sort of gradient generator) and add to the 
      **ToColors arrays. The code will order it from light --> dark, so don't worry about that.
**/
var fromSourceColor = "#FFFFFF";
var toSourceColor = "#000000";
var phosColors = [
  "#BF0000",
  "#FFCCFF",
  "#FFEC99",
  "#663100",
  "#57612e",
  "#A2EB85",
];
var nitroColors = ["#BF0000", "#FFCCFF", "#FFEC99", "#663100", "#c9daf8"];
var streamflowColors = ["#579689", "#BF0000", "#BB8FCE", "#2ECC71"];
var sedimentColors = [
  "#ff3fff",
  "#ffb9ff",
  "#f2dcdb",
  "#d6ad00",
  "#ffe885",
  "#fff811",
  "#000000",
  "#08612e",
  "#0eaa51",
  "#a2eb85",
  "#f58833",
];

function getFields(sourceDefObj, mappedDefObj, definitionCode, group) {
  var fieldsArr = [];
  var tempArr = [];
  //If group is not in global aggregateDefinitions object, then it's a catchment definition.
  if (!aggregateDefinitions.hasOwnProperty(group.toLowerCase())) {
    fieldsArr.push({
      attribute: group.toUpperCase(),
      label: mappedDefObj.comid,
    });
    for (var key in sourceDefObj) {
      fieldsArr.push({
        attribute: definitionCode.toUpperCase() + "_" + key.toUpperCase(),
        label:
          mappedDefObj[definitionCode.toLowerCase()] + " " + sourceDefObj[key],
      });
    }
  } else {
    fieldsArr.push({
      attribute: group.toUpperCase(),
      label: aggregateDefinitions[group],
    });
    for (var key in sourceDefObj) {
      //create temp array to hold special sediment DAL and DAY sources that need to be reordered out of the standard JS sequence
      if (key == "s0" || key == "10" || key == "11" || key == "12") {
        tempArr.push({
          attribute:
            group.toUpperCase() +
            "_" +
            definitionCode.toUpperCase() +
            "_" +
            key.toUpperCase(),
          label:
            mappedDefObj[definitionCode.toLowerCase()] +
            " " +
            sourceDefObj[key],
        });
        //find arrays with s0 in them to get them in the sources back in the correct order
        tempArr.filter(function (obj) {
          if (obj.attribute.includes("S0")) {
            tempArr.reverse();
          }
        });
      } else {
        fieldsArr.push({
          attribute:
            group.toUpperCase() +
            "_" +
            definitionCode.toUpperCase() +
            "_" +
            key.toUpperCase(),
          label:
            mappedDefObj[definitionCode.toLowerCase()] +
            " " +
            sourceDefObj[key],
        });
      }
    }
  }
  if (tempArr.length > 0) {
    //merge arrays to handle DAL and DAY special cases.  concat wasn't working :-\
    Array.prototype.push.apply(fieldsArr, tempArr);
    //console.log(fieldsArr);
  }
  return fieldsArr;
}

/***-----BEGIN PHOSPHORUS LAYER GROUPS --------***/
/* PHOSPHORUS CATCHMENTS */

/*DOCUMENTATION NOTES: each 'field below should correspond to a "Mapped Attribute" in the cats_tp_attribute_Definitions.xlsx file.  These are the attributes that will be displayed on the map. */
var Catchments = [
  {
    field: "ACCL",
    name: catchmentDefinitions.accl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "accl",
      "comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions.concentrat,
    chartOutfields: [
      { attribute: "COMID", label: catchmentDefinitions.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions.incl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "incl",
      "comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions.accy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "accy",
      "comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions.incy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "incy",
      "comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions.daccl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "daccl",
      "comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions.daccy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "daccy",
      "comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions.dincl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "dincl",
      "comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions.dincy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "dincy",
      "comid"
    ),
  },
];

var Group2 = [
  {
    field: "GP2_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "ay",
      "gp2"
    ),
  },
  {
    field: "GP2_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "day",
      "gp2"
    ),
  },
  {
    field: "GP2_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "al",
      "gp2"
    ),
  },
  {
    field: "GP2_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "dal",
      "gp2"
    ),
  },
];

var Group1 = [
  {
    field: "GP1_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "ay",
      "gp1"
    ),
  },
  {
    field: "GP1_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "day",
      "gp1"
    ),
  },
  {
    field: "GP1_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "al",
      "gp1"
    ),
  },
  {
    field: "GP1_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "dal",
      "gp1"
    ),
  },
];

var ST = [
  {
    field: "ST_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "ay",
      "st"
    ),
  },
  {
    field: "ST_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "day",
      "st"
    ),
  },
  {
    field: "ST_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "al",
      "st"
    ),
  },
  {
    field: "ST_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "dal",
      "st"
    ),
  },
];

var Catchments_st = [
  {
    field: "ACCL",
    name: catchmentDefinitions.accl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "accl",
      "st_comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions.concentrat,
    chartOutfields: [
      { attribute: "ST_COMID", label: catchmentDefinitions.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions.incl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "incl",
      "st_comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions.accy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "accy",
      "st_comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions.incy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "INCY",
      "st_comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions.daccl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "daccl",
      "st_comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions.daccy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "daccy",
      "st_comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions.dincl,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "dincl",
      "st_comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions.dincy,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      catchmentDefinitions,
      "dincy",
      "st_comid"
    ),
  },
];

var Group2_st = [
  {
    field: "SG2_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "ay",
      "sg2"
    ),
  },
  {
    field: "SG2_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "day",
      "sg2"
    ),
  },
  {
    field: "SG2_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "al",
      "sg2"
    ),
  },
  {
    field: "SG2_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "dal",
      "sg2"
    ),
  },
];

var Group1_st = [
  {
    field: "SG1_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "ay",
      "sg1"
    ),
  },
  {
    field: "SG1_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "day",
      "sg1"
    ),
  },
  {
    field: "SG1_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "al",
      "sg1"
    ),
  },
  {
    field: "SG1_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      phosphorusSourceDefinitions,
      mappedDefinitions,
      "dal",
      "sg1"
    ),
  },
];
////END PHOSPHORUS LAYER GROUPS______________________________________________________________________________________________________________________________

////BEGIN NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________
//Catchments NITRO
var Catchments_tn = [
  {
    field: "ACCL",
    name: catchmentDefinitions_tn.accl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "accl",
      "comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions_tn.concentrat,
    chartOutfields: [
      { attribute: "COMID", label: catchmentDefinitions_tn.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions_tn.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions_tn.incl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "incl",
      "comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_tn.accy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "accy",
      "comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_tn.incy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "incy",
      "comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_tn.daccl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "daccl",
      "comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_tn.daccy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "daccy",
      "comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_tn.dincl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "dincl",
      "comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_tn.dincy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "dincy",
      "comid"
    ),
  },
];

var Group2_tn = [
  {
    field: "GP2_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "ay",
      "gp2"
    ),
  },
  {
    field: "GP2_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "day",
      "gp2"
    ),
  },
  {
    field: "GP2_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "al",
      "gp2"
    ),
  },
  {
    field: "GP2_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "dal",
      "gp2"
    ),
  },
];

var Group1_tn = [
  {
    field: "GP1_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "ay",
      "gp1"
    ),
  },
  {
    field: "GP1_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "day",
      "gp1"
    ),
  },
  {
    field: "GP1_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "al",
      "gp1"
    ),
  },
  {
    field: "GP1_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "dal",
      "gp1"
    ),
  },
];

var ST_tn = [
  {
    field: "ST_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "ay",
      "st"
    ),
  },
  {
    field: "ST_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "day",
      "st"
    ),
  },
  {
    field: "ST_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "al",
      "st"
    ),
  },
  {
    field: "ST_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "dal",
      "st"
    ),
  },
];

var Catchments_st_tn = [
  {
    field: "ACCL",
    name: catchmentDefinitions_tn.accl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "accl",
      "st_comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions_tn.concentrat,
    chartOutfields: [
      { attribute: "ST_COMID", label: catchmentDefinitions_tn.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions_tn.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions_tn.incl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "incl",
      "st_comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_tn.accy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "accy",
      "st_comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_tn.incy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "incy",
      "st_comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_tn.daccl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "daccl",
      "st_comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_tn.daccy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "daccy",
      "st_comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_tn.dincl,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "dincl",
      "st_comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_tn.dincy,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      catchmentDefinitions_tn,
      "dincy",
      "st_comid"
    ),
  },
];

var Group2_st_tn = [
  {
    field: "SG2_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "ay",
      "sg2"
    ),
  },
  {
    field: "SG2_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "day",
      "sg2"
    ),
  },
  {
    field: "SG2_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "al",
      "sg2"
    ),
  },
  {
    field: "SG2_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "dal",
      "sg2"
    ),
  },
];

var Group1_st_tn = [
  {
    field: "SG1_AY",
    name: mappedDefinitions.ay,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "ay",
      "sg1"
    ),
  },
  {
    field: "SG1_DAY",
    name: mappedDefinitions.day,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "day",
      "sg1"
    ),
  },
  {
    field: "SG1_AL",
    name: mappedDefinitions.al,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "al",
      "sg1"
    ),
  },
  {
    field: "SG1_DAL",
    name: mappedDefinitions.dal,
    chartOutfields: getFields(
      nitrogenSourceDefinitions,
      mappedDefinitions,
      "dal",
      "sg1"
    ),
  },
];
////END NITROGEN LAYER GROUPS______________________________________________________________________________________________________________________________

////BEGIN STREAMFLOW LAYER GROUPS______________________________________________________________________________________________________________________________
var Catchments_q = [
  {
    field: "ACCL",
    name: catchmentDefinitions_q.accl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "accl",
      "comid"
    ),
  },
  {
    field: "INCL",
    name: catchmentDefinitions_q.incl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "incl",
      "comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_q.accy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "accy",
      "comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_q.incy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "incy",
      "comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_q.daccl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "daccl",
      "comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_q.daccy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "daccy",
      "comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_q.dincl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "dincl",
      "comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_q.dincy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "dincy",
      "comid"
    ),
  },
];

var Group2_q = [
  {
    field: "GP2_AY",
    name: mappedDefinitions_q.ay,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "ay",
      "gp2"
    ),
  },
  {
    field: "GP2_DAY",
    name: mappedDefinitions_q.day,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "day",
      "gp2"
    ),
  },
  {
    field: "GP2_AL",
    name: mappedDefinitions_q.al,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "al",
      "gp2"
    ),
  },
  {
    field: "GP2_DAL",
    name: mappedDefinitions_q.dal,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "dal",
      "gp2"
    ),
  },
];

var Group1_q = [
  {
    field: "GP1_AY",
    name: mappedDefinitions_q.ay,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "ay",
      "gp1"
    ),
  },
  {
    field: "GP1_DAY",
    name: mappedDefinitions_q.day,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "day",
      "gp1"
    ),
  },
  {
    field: "GP1_AL",
    name: mappedDefinitions_q.al,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "al",
      "gp1"
    ),
  },
  {
    field: "GP1_DAL",
    name: mappedDefinitions_q.dal,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "dal",
      "gp1"
    ),
  },
];

var ST_q = [
  {
    field: "ST_AY",
    name: mappedDefinitions_q.ay,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "ay",
      "st"
    ),
  },
  {
    field: "ST_DAY",
    name: mappedDefinitions_q.day,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "day",
      "st"
    ),
  },
  {
    field: "ST_AL",
    name: mappedDefinitions_q.al,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "al",
      "st"
    ),
  },
  {
    field: "ST_DAL",
    name: mappedDefinitions_q.dal,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "dal",
      "st"
    ),
  },
];

var Catchments_st_q = [
  {
    field: "ACCL",
    name: catchmentDefinitions_q.accl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "accl",
      "st_comid"
    ),
  },
  {
    field: "INCL",
    name: catchmentDefinitions_q.incl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "incl",
      "st_comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_q.accy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "accy",
      "st_comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_q.incy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "incy",
      "st_comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_q.daccl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "daccl",
      "st_comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_q.daccy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "daccy",
      "st_comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_q.dincl,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "dincl",
      "st_comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_q.dincy,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      catchmentDefinitions_q,
      "dincy",
      "st_comid"
    ),
  },
];

var Group2_st_q = [
  {
    field: "SG2_AY",
    name: mappedDefinitions_q.ay,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "ay",
      "sg2"
    ),
  },
  {
    field: "SG2_DAY",
    name: mappedDefinitions_q.day,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "day",
      "sg2"
    ),
  },
  {
    field: "SG2_AL",
    name: mappedDefinitions_q.al,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "al",
      "sg2"
    ),
  },
  {
    field: "SG2_DAL",
    name: mappedDefinitions_q.dal,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "dal",
      "sg2"
    ),
  },
];

var Group1_st_q = [
  {
    field: "SG1_AY",
    name: mappedDefinitions_q.ay,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "ay",
      "sg1"
    ),
  },
  {
    field: "SG1_DAY",
    name: mappedDefinitions_q.day,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "day",
      "sg1"
    ),
  },
  {
    field: "SG1_AL",
    name: mappedDefinitions_q.al,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "al",
      "sg1"
    ),
  },
  {
    field: "SG1_DAL",
    name: mappedDefinitions_q.dal,
    chartOutfields: getFields(
      streamflowSourceDefinitions,
      mappedDefinitions_q,
      "dal",
      "sg1"
    ),
  },
];
////END STREAMFLOW LAYER GROUPS______________________________________________________________________________________________________________________________

////BEGIN SUSPENDED SEDIMENT LAYER GROUPS______________________________________________________________________________________________________________________________
var Catchments_ss = [
  {
    field: "ACCL",
    name: catchmentDefinitions_ss.accl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "accl",
      "comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions_ss.concentrat,
    chartOutfields: [
      { attribute: "COMID", label: catchmentDefinitions_ss.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions_ss.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions_ss.incl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "incl",
      "comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_ss.accy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "accy",
      "comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_ss.incy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "incy",
      "comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_ss.daccl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "daccl",
      "comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_ss.daccy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "daccy",
      "comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_ss.dincl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "dincl",
      "comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_ss.dincy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "dincy",
      "comid"
    ),
  },
];

var Group2_ss = [
  {
    field: "GP2_AY",
    name: mappedDefinitions_ss.ay,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "ay",
      "gp2"
    ),
  },
  {
    field: "GP2_DAY",
    name: mappedDefinitions_ss.day,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "day",
      "gp2"
    ),
  },
  {
    field: "GP2_AL",
    name: mappedDefinitions_ss.al,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "al",
      "gp2"
    ),
  },
  {
    field: "GP2_DAL",
    name: mappedDefinitions_ss.dal,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "dal",
      "gp2"
    ),
  },
];

var Group1_ss = [
  {
    field: "GP1_AY",
    name: mappedDefinitions_ss.ay,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "ay",
      "gp1"
    ),
  },
  {
    field: "GP1_DAY",
    name: mappedDefinitions_ss.day,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "day",
      "gp1"
    ),
  },
  {
    field: "GP1_AL",
    name: mappedDefinitions_ss.al,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "al",
      "gp1"
    ),
  },
  {
    field: "GP1_DAL",
    name: mappedDefinitions_ss.dal,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "dal",
      "gp1"
    ),
  },
];

var ST_ss = [
  {
    field: "ST_AY",
    name: mappedDefinitions_ss.ay,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "ay",
      "st"
    ),
  },
  {
    field: "ST_DAY",
    name: mappedDefinitions_ss.day,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "day",
      "st"
    ),
  },
  {
    field: "ST_AL",
    name: mappedDefinitions_ss.al,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "al",
      "st"
    ),
  },
  {
    field: "ST_DAL",
    name: mappedDefinitions_ss.dal,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "dal",
      "st"
    ),
  },
];

var Catchments_st_ss = [
  {
    field: "ACCL",
    name: catchmentDefinitions_ss.accl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "accl",
      "st_comid"
    ),
  },
  {
    field: "CONCENTRAT",
    name: catchmentDefinitions_ss.concentrat,
    chartOutfields: [
      { attribute: "COMID", label: catchmentDefinitions_ss.comid },
      {
        attribute: "CONCENTRAT",
        label: catchmentDefinitions_ss.concentrat + " Total",
      },
    ],
  },
  {
    field: "INCL",
    name: catchmentDefinitions_ss.incl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "incl",
      "st_comid"
    ),
  },
  {
    field: "ACCY",
    name: catchmentDefinitions_ss.accy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "accy",
      "st_comid"
    ),
  },
  {
    field: "INCY",
    name: catchmentDefinitions_ss.incy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "incy",
      "st_comid"
    ),
  },
  {
    field: "DACCL",
    name: catchmentDefinitions_ss.daccl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "daccl",
      "st_comid"
    ),
  },
  {
    field: "DACCY",
    name: catchmentDefinitions_ss.daccy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "daccy",
      "st_comid"
    ),
  },
  {
    field: "DINCL",
    name: catchmentDefinitions_ss.dincl,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "dincl",
      "st_comid"
    ),
  },
  {
    field: "DINCY",
    name: catchmentDefinitions_ss.dincy,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      catchmentDefinitions_ss,
      "dincy",
      "st_comid"
    ),
  },
];

var Group2_st_ss = [
  {
    field: "SG2_AY",
    name: mappedDefinitions_ss.ay,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "ay",
      "sg2"
    ),
  },
  {
    field: "SG2_DAY",
    name: mappedDefinitions_ss.day,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "day",
      "sg2"
    ),
  },
  {
    field: "SG2_AL",
    name: mappedDefinitions_ss.al,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "al",
      "sg2"
    ),
  },
  {
    field: "SG2_DAL",
    name: mappedDefinitions_ss.dal,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "dal",
      "sg2"
    ),
  },
];

var Group1_st_ss = [
  {
    field: "SG1_AY",
    name: mappedDefinitions_ss.ay,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "ay",
      "sg1"
    ),
  },
  {
    field: "SG1_DAY",
    name: mappedDefinitions_ss.day,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "day",
      "sg1"
    ),
  },
  {
    field: "SG1_AL",
    name: mappedDefinitions_ss.al,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "al",
      "sg1"
    ),
  },
  {
    field: "SG1_DAL",
    name: mappedDefinitions_ss.dal,
    chartOutfields: getFields(
      sedimentSourceDefinitions,
      mappedDefinitions_ss,
      "dal",
      "sg1"
    ),
  },
];
////END SUSPENDED SEDIMENT LAYER GROUPS______________________________________________________________________________________________________________________________
