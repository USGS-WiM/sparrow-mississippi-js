/**UPDATE impoartant! -- when updating to a new application, make sure that all visiblelayer Ids match the corresponding REST service layer.
    Also make sure that titles are appropriate
 **/
var allLayers;

require([
  "esri/geometry/Extent",
  "esri/layers/WMSLayerInfo",
  "esri/layers/FeatureLayer",
  "esri/layers/ImageParameters",
  "esri/layers/LayerDrawingOptions",
  "dojo/domReady!",
], function (
  Extent,
  WMSLayerInfo,
  FeatureLayer,
  ImageParameters,
  LayerDrawingOptions
) {
  var sparrowOverlay;
  if ($("#radio1")[0].checked == true) {
    sparrowOverlay = 0;
  } else {
    sparrowOverlay = 0;
  }

  var layerOptions = new LayerDrawingOptions();
  layerOptions.scaleSymbols = true;

  allLayers = [
    {
      groupHeading: "SPARROW Model",
      showGroupHeading: true,
      includeInLayerList: true,
      layers: {
        "SPARROW Model Results": {
          url: serviceBaseURL,
          visibleLayers: [sparrowOverlay],
          options: {
            id: "SparrowRanking",
            opacity: 0.75,
            visible: true,
            layerDrawingOptions: layerOptions,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
      },
    },
    {
      groupHeading: "Model Calibration Sites",
      showGroupHeading: true,
      includeInLayerList: true,
      layers: {
        "Phosphorus Calibration Sites": {
          url: serviceBaseURL,
          visibleLayers: [28],
          options: {
            id: "phosCalibration",
            opacity: 0.85,
            visible: false,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            zoomScale: 144448,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: true,
          },
        },
        "Nitrogen Calibration Sites": {
          url: serviceBaseURL,
          visibleLayers: [29],
          options: {
            id: "nitroCalibration",
            visible: false,
            opacity: 0.85,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
        "Suspended Sediment Calibration Sites": {
          url: serviceBaseURL,
          visibleLayers: [31],
          options: {
            id: "sedimentCalibration",
            visible: false,
            opacity: 0.85,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
        "Streamflow Calibration Sites": {
          url: serviceBaseURL,
          visibleLayers: [30],
          options: {
            id: "streamflowCalibration",
            visible: false,
            opacity: 0.85,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
      },
    },
    {
      groupHeading: "Auxiliary Layers",
      showGroupHeading: true,
      includeInLayerList: true,
      layers: {
        "Mississippi Reaches - zoom in to view": {
          url: serviceBaseURL,
          visibleLayers: [32],
          options: {
            id: "streams",
            visible: false,
            minScale: 3155581.108577,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            zoomScale: 3155581.108577,
            includeLegend: false,
          },
        },
        "Reaches > 100 cfs": {
          url: serviceBaseURL,
          visibleLayers: [33],
          options: {
            id: "gt100",
            visible: false,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisDynamic",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
        "NLCD Land Use 2012": {
          url: "https://gis1.wim.usgs.gov/server/rest/services/SWTrends/lu2012_100515_test/ImageServer",
          options: {
            id: "lu2012",
            opacity: 0.5,
            visible: false,
          },
          wimOptions: {
            type: "layer",
            layerType: "agisImage",
            includeInLayerList: true,
            hasOpacitySlider: true,
            hasZoomto: false,
            includeLegend: false,
          },
        },
      },
    },
  ];
});
