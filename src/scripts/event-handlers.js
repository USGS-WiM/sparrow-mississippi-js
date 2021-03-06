function loadEventHandlers() {
  /*RADIO EVENTS*/
  $(".radio").on("change", function (e) {
    $("#page-loader").fadeIn();

    var groupBySelectedIndex = $("#groupResultsSelect")[0].selectedIndex;
    var selectedRadio = this.firstElementChild.id;

    populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
    setAggregateGroup(groupBySelectedIndex, selectedRadio);
    updateSourceOptions();
    generateRenderer();

    //reflow the chart if it's open
    /*  if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            //$("#toast_title").html("Loading...");
            //$("#toast_body").html("Chart updating");  
            //$("#toast-fixed").fadeIn();  
 
            app.createChartQuery();
        } */
  });
  /*END RADIO EVENTS*/

  //UPDATE: important! make sure the file name is updated_____________________________________________________
  $("#phosphorusDownload").on("click", function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = phosphorusShapefileURL;
  });
  //UPDATE: important! make sure the file name is updated_____________________________________________________
  $("#nitrogenDownload").on("click", function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = nitrogenShapefileURL;
  });
  $("#streamflowDownload").on("click", function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = streamflowShapefileURL;
  });
  //UPDATE: important! make sure the file name is updated_____________________________________________________
  $("#sedimentDownload").on("click", function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = sedimentShapefileURL;
  });
  /* $("#phosphorusCalibrationDownload").click(function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = phosCalibrationURL;
  });
  $("#nitrogenCalibrationDownload").click(function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = nitroCalibrationURL;
  });
  $("#sedimentCalibrationDownload").click(function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = sedimentCalibrationURL;
  });
  $("#streamflowCalibrationDownload").click(function () {
    // hope the server sets Content-Disposition: attachment!
    window.location = streamflowCalibrationURL;
  }); */

  /* AOI EVENTS */
  $(".aoiSelect").on("change", AOIChange);

  /* GROUP RESULTS (AGGREGATE LAYER) EVENTS */
  //set initial Displayed Metric options
  $("#groupResultsSelect").on("loaded.bs.select", function () {
    $("#groupResultsSelect").selectpicker("val", groupResultsLabels.a); //set initial value to Catchment for initial load AND refresh
    $("#groupResultsSelect").selectpicker("refresh");
    populateMetricOptions($("#groupResultsSelect")[0].selectedIndex);
    updateSourceOptions();
    generateRenderer();
  });

  // selector for click individual polygons button and draw square around to select multiple polygons
  var selectPolygons = $("#clickPolyButton");
  selectPolygons.click(function () {
    if (app.clickSelectionActive) {
      selectPolygons.removeClass("active");
      $("#shiftNote").remove();
      selectPolygons.html(
        '<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;Select'
      );
      app.map.setMapCursor("auto");
      app.clickSelectionActive = false;
      if (
        app.userSelectedShapes.length == 0 &&
        app.polygonResponseCount > chartFeatureMax
      ) {
        $("#chartButton").prop("disabled", true).css("cursor", "not-allowed");
      } else {
        $("#chartButton")
          .prop("disabled", false)
          .css("pointer-events", "auto")
          .css("cursor", "pointer");
      }
    } else if (!app.clickSelectionActive) {
      $("#customSelect").append(
        '<div id="shiftNote" style="padding-left: 1em;color: orangered;">Shift+Click to Deselect</div>'
      );
      selectPolygons.addClass("active");
      selectPolygons.html(
        '<i class="glyphicon glyphicon-stop"></i>&nbsp;&nbsp;Stop selecting'
      );
      app.map.setMapCursor("crosshair");
      $("#chartButton").prop("disabled", true).css("cursor", "not-allowed");
      app.clickSelectionActive = true;
    }
  });

  //keep Displayed Metric options in sync
  $("#groupResultsSelect").on("changed.bs.select", function (e) {
    app.clearFindGraphics();
    populateMetricOptions(e.currentTarget.selectedIndex);
    setAggregateGroup(
      e.currentTarget.selectedIndex,
      $(".radio input[type='radio']:checked")[0].id
    );
    updateSourceOptions();
    generateRenderer();

    /*  if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            app.map.graphics.clear();
            app.createChartQuery();
        } */
  });
  /*END GROUP RESULTS (AGGREGATE LAYER) EVENTS */

  /*METRIC EVENTS*/
  $("#displayedMetricSelect").on("changed.bs.select", function (e) {
    $("#page-loader").fadeIn();
    updateSourceOptions();
    generateRenderer();

    /* if( $("#chartWindowDiv").css("visibility") == "visible" ) {
            $("#toast_title").html("Loading...");
            $("#toast_body").html("Chart updating");  
            $("#toast-fixed").fadeIn();
            app.createChartQuery();
        } */
  });
  /*END METRIC EVENTS*/

  /*METRIC EVENTS*/
  $("#displayedSourceSelect").on("changed.bs.select", function (e) {
    if (e.target.value == "All Sources") {
      delete app.chosenSource;
    } else {
      var ind = e.target.selectedIndex;
      app.chosenSource = {
        label: e.target[ind].label,
        attribute: e.target.value,
      };
    }
    $("#page-loader").fadeIn();
    generateRenderer();
  });

  /* CLEAR AOI BUTTON EVENT */
  $("#clearAOIButton").on("click", function () {
    //if resetting to default, make sure GRP3 is disabled
    /* $("#grp3-select").attr("disabled", "disabled");
    $("#grp3-select").addClass("disabled");
    $("#grp3-select").selectpicker("refresh"); */

    $("#page-loader").show();
    var sparrowId = app.map.getLayer("SparrowRanking").visibleLayers[0];

    //revert to default layer from split layer
    if ($.inArray(sparrowId, splitLayers) > -1) {
      //quick fix to reset state layer correctly if SG1 and GRB:State were selected
      if ($("#groupResultsSelect")[0].selectedIndex == 4) {
        sparrowId = returnToStateLayer(sparrowId);
      } else {
        sparrowId = returnDefaultLayer(
          sparrowId,
          $(".radio input[type='radio']:checked")[0].id
        );
      }

      var layerArr = [];
      layerArr.push(sparrowId);
      app.map.getLayer("SparrowRanking").setVisibleLayers(layerArr);
      app.map.getLayer("SparrowRanking").setDefaultLayerDefinitions(true); //don't refresh yet.
    } else {
      app.map.getLayer("SparrowRanking").setDefaultLayerDefinitions(true); //don't refresh yet.
    }

    //reset the selects
    $(".aoiSelect").selectpicker("val", ""); // 'hack' because selectpicker('deselectAll') method only works when bootstrap-select is open.

    populateMetricOptions($("#groupResultsSelect")[0].selectedIndex); //populate correct metric options
    updateSourceOptions();
    generateRenderer(); //redraw the symbols

    //return to Default AOI options for ALL AOI selects
    app.clearLayerDefObj();

    /**CODE FOR CHART VISIBILITY Was here */
    // remove all warnings if any
    $(".grp1-warning").remove();
    $(".grp2-warning").remove();
    //$(".grp3-warning").remove();
    //loop through all options from group results by and enable all
    $("#groupResultsSelect option").each(function () {
      this.disabled = false;
    });
    $("#groupResultsSelect").selectpicker("render");
  });
  /*END CLEAR AOI BUTTON EVENT */

  // called from within $('.nonAOISelect').on('change' function several times to append warning and clear contents of AOI when getting set to disabled
  function clearAOIandAppendWarning(
    warningId,
    cantShow,
    fromHere,
    thisSelect,
    anAOI
  ) {
    // 'grp2-warning', 'Tributary', 'HUC8', '#grp2-select option', 'AOI2');
    $("#clearAOIButton").append(
      "<a class='" +
        warningId +
        "' data-toggle='tooltip' data-placement='top' title='Cannot show " +
        cantShow +
        " Area of Interest while grouping by " +
        fromHere +
        ".'>" +
        "<span class='glyphicon glyphicon-warning-sign'></span></a>"
    );
    //has value, so unselect it, clear the app's LayerDefObj of this property & trigger AOIChange event
    $(thisSelect + " option").attr("selected", false);
    app.clearOneLayerDefObj(anAOI); //clear out this one
    var newE2 = { currentTarget: { id: thisSelect, value: "" } }; //making an 'e' to pass along
    AOIChange(newE2); //go through the aoichange event to do the rest
  }
  /***TODO UPDATE IMPORTANT! -- THE CASES IN MRB3 ARE CORRECT, BUT THE LOGIC NEEDS TO BE REVISITED TO DETERMINE WHICH AOI COMBINATIONS NEED TO BE DISABLED****/
  $(".nonAOISelect").on("change", function () {
    $("#page-loader").fadeIn();
    //first clear all disabled's and warnings
    $("#grp1-select").removeClass("disabled"); //River Basin
    $("#grp1-select").removeAttr("disabled");
    $(".grp1-warning").remove();
    $("#grp2-select").removeClass("disabled"); //trib
    $("#grp2-select").removeAttr("disabled");
    $(".grp2-warning").remove();
    /* $("#grp3-select").removeClass("disabled"); //huc8
    $("#grp3-select").removeAttr("disabled");
    $(".grp3-warning").remove(); */

    //call to check if user has selected a value in the AOI
    var AOIhasValue = function () {
      if ($("#grp1-select")[0].value !== "") {
        return true;
      } else if ($("#grp2-select")[0].value !== "") {
        return true;
        /* } else if ($("#grp3-select")[0].value !== "") {
        return true; */
      } else if ($("#st-select")[0].value !== "") {
        return true;
      } else {
        return false;
      }
    };

    switch ($("#groupResultsSelect")[0].selectedIndex) {
      case 0: //Catchment
        //DISABLE HUC8 @ full extent because it has too many options
        /*  if (AOIhasValue() === false) {
          $("#grp3-select").attr("disabled", "disabled");
          $("#grp3-select").addClass("disabled");
          $("#grp3-select").selectpicker("refresh");
        } else {
          $("#grp3-select").selectpicker("refresh");
        } */

        //AOI HUC8(GP3) AND Main River basin(GP1) enabled
        $("#grp1-select").selectpicker("refresh");
        $("#grp2-select").selectpicker("refresh");
        break;
      case 1: //huc8
        /***AOI Logic (Disable Tributary(GP2) & clear value if any) ***/
        //Tributary
        if (app.getLayerDefObj().AOI2) {
          clearAOIandAppendWarning(
            "grp2-warning",
            "HUC12",
            "HUC12",
            "#grp2-select",
            "AOI2"
          );
        }
        //DISABLE HUC8 @ full extent because it has too many options
        /* if (AOIhasValue() === false) {
          $("#grp3-select").attr("disabled", "disabled");
          $("#grp3-select").addClass("disabled");
          $("#grp3-select").selectpicker("refresh");
        } else {
          $("#grp3-select").selectpicker("refresh");
        } */
        //disable tributary (GP2 is not in the GP3 attributes)
        /* $("#grp2-select").attr("disabled", "disabled");
                $("#grp2-select").addClass("disabled"); */

        //AOI HUC8(GP3) AND Main River basin(GP1) enabled
        $("#grp2-select").selectpicker("refresh");
        $("#grp1-select").selectpicker("refresh");
        break;
      case 2: //Tributary
        /***AOI logic (disable HUC8(GP3) & clear value if any) ***/
        //huc8
        if (app.getLayerDefObj().AOI3) {
          clearAOIandAppendWarning(
            "grp3-warning",
            "HUC8",
            "HUC8",
            "#grp3-select",
            "AOI3"
          );
        }
        //disable the HUC8 dropdown
        /* $("#grp3-select").attr("disabled", "disabled"); //huc8
        $("#grp3-select").addClass("disabled");
        $("#grp3-select").selectpicker("refresh"); */

        //AOI Tributary(GP2) AND Main River basin(GP1) enabled
        $("#grp2-select").selectpicker("refresh");
        $("#grp1-select").selectpicker("refresh");
        break;
      /* case 3: //River Basin
        //AOI logic (disable Tributary(GP2)  AND HUC8(GP3) & clear values if any) 
        //Tributary
        if (app.getLayerDefObj().AOI2) {
          clearAOIandAppendWarning(
            "grp2-warning",
            "HUC8",
            "River Basin",
            "#grp2-select",
            "AOI2"
          );
        }
        $("#grp2-select").attr("disabled", "disabled"); //Tributary
        $("#grp2-select").addClass("disabled");
        $("#grp2-select").selectpicker("refresh");

        // AIO Main River Basin (GP1) enabled
        $("#grp1-select").selectpicker("refresh");
        //huc8
        if (app.getLayerDefObj().AOI3) {
          clearAOIandAppendWarning(
            "grp3-warning",
            "HUC8",
            "River Basin",
            "#grp3-select",
            "AOI3"
          );
        }
        $("#grp3-select").attr("disabled", "disabled"); //huc8
        $("#grp3-select").addClass("disabled");
        $("#grp3-select").selectpicker("refresh");
        break; */
      case 3: //STATE
        /***AOI logic (disable GP1(Main Riv. Basin) AND GP2(Trib.) AND GP3(HUC8) & clear values if any) ***/
        //Main Riv Basin
        /* if (app.getLayerDefObj().AOI1) {
                    clearAOIandAppendWarning("grp1-warning", "River Basin", "State", "#grp1-select", "AOI1");
                }
                $("#grp1-select").attr("disabled", "disabled"); //independent watersheds
                $("#grp1-select").addClass("disabled"); */
        $("#grp1-select").selectpicker("refresh");

        //Tributary
        /* if (app.getLayerDefObj().AOI2) {
                    clearAOIandAppendWarning("grp2-warning", "HUC8", "State", "#grp2-select", "AOI2");
                }
                $("#grp2-select").attr("disabled", "disabled"); //huc8
                $("#grp2-select").addClass("disabled"); */
        $("#grp2-select").selectpicker("refresh");

        /* if (app.getLayerDefObj().AOI3) {
                    clearAOIandAppendWarning("grp3-warning", "HUC8", "State", "#grp3-select", "AOI3");
                }*/
        /*  if ($("#grp2-select")[0].value !== "") {
          $("#grp3-select").attr("disabled", "disabled");
          $("#grp3-select").addClass("disabled");
          $("#grp3-select").selectpicker("refresh");
        } else */
        /* if (
          $("#grp1-select")[0].value !== "" ||
          $("#grp2-select")[0].value !== "" ||
          $("#st-select")[0].value !== ""
        ) {
          $("#grp3-select").attr("disabled", "disabled");
          $("#grp3-select").addClass("disabled");
          $("#grp3-select").selectpicker("refresh");
        } else {
          $("#grp3-select").selectpicker("refresh");
        } */
        break;
    } //end switch
  });

  /* SHOW CHART BUTTON CLICK */
  $("#chartButton").on("click", function () {
    //set up the Chart chain of events
    //check to see if custom click was performed
    if (app.userSelectedDispFieldName != "") {
      app.formattedHighlightString =
        app.userSelectedDispFieldName +
        " IN (" +
        app.userSelectedShapes.join(",") +
        ")";
      app.customChartClicked = true;
      //console.log("Custom Click: " + app.formattedHighlightString);
      app.createChartQuery(app.formattedHighlightString);
      app.userSelectedDispFieldName = "";
      app.userSelectedShapes = [];
    } else {
      app.createChartQuery();
    }
  });

  $(".chartDisabledGlyph").on("click", function () {
    alert("you can't do that");
  });

  //if modal is called by the button in the legend, open the correct tab
  $("#aboutModal").on("show.bs.modal", function () {
    if (event.srcElement.id == "legendInfoButton") {
      $(".nav-tabs a[href='#definitionsTabPane']").tab("show");
    }
  });

  //following block forces map size to override problems with default behavior
  $(window).resize(function () {
    if ($("#legendCollapse").hasClass("in")) {
      maxLegendHeight = $("#mapDiv").height() * 0.9;
      $("#legendElement").css("height", maxLegendHeight);
      $("#legendElement").css("max-height", maxLegendHeight);
      maxLegendDivHeight =
        $("#legendElement").height() -
        parseInt($("#legendHeading").css("height").replace("px", ""));
      $("#legendDiv").css("max-height", maxLegendDivHeight);
    } else {
      $("#legendElement").css("height", "initial");
    }
  });

  //displays map scale on map load
  app.map.on("load", function () {
    app.initMapScale();
    app.map.infoWindow.set("highlight", false);
    app.map.infoWindow.set("titleInBody", false);
    app.setupDraggableInfoWindow();
    app.map.disableClickRecenter();
  });

  app.map.on("update-end", function () {
    $("#page-loader").fadeOut();
  });

  //displays map scale on scale change (i.e. zoom level)
  app.map.on("zoom-end", function () {
    var scale = app.map.getScale().toFixed(0);
    $("#scale")[0].innerHTML = addCommas(scale);
    console.log();
    var zoomEnd = app.map.getZoom();
    //for the dynamic borders
    if (app.currentZoomLevel <= borderThreshold && zoomEnd > borderThreshold) {
      generateRenderer();
    } else if (
      app.currentZoomLevel > borderThreshold &&
      zoomEnd <= borderThreshold
    ) {
      generateRenderer();
    }
    app.currentZoomLevel = zoomEnd;
  });

  //updates lat/lng indicator on mouse move. does not apply on devices w/out mouse. removes "map center" label
  app.map.on("mouse-move", function (cursorPosition) {
    app.updateMousePosition(cursorPosition);
  });

  //updates lat/lng indicator to map center after pan and shows "map center" label.
  app.map.on("pan-end", function () {
    app.updateMapCenter(app.map.extent);
  });

  //end code for adding draggability to infoWindow

  //map click w/ identifyParams  -- more params set in executeIdentifyTask();
  app.map.on("click", function (evt) {
    app.identifyParams = new esri.tasks.IdentifyParameters();
    app.identifyParams.tolerance = 8;
    app.identifyParams.returnGeometry = true;
    app.identifyParams.layerOption =
      esri.tasks.IdentifyParameters.LAYER_OPTION_VISIBLE;
    app.identifyParams.width = app.map.width;
    app.identifyParams.height = app.map.height;
    app.identifyTask = new esri.tasks.IdentifyTask(serviceBaseURL);
    if (app.map.getLayer("SparrowRanking").layerDefinitions) {
      app.identifyParams.layerDefinitions =
        app.map.getLayer("SparrowRanking").layerDefinitions;
    }
    app.executeIdentifyTask(evt);
  });

  //on clicks to swap basemap.app.map.removeLayer is required for nat'l map b/c it is not technically a basemap, but a tiled layer.
  $("#btnStreets").on("click", function () {
    app.map.setBasemap("streets");
  });
  $("#btnSatellite").on("click", function () {
    app.map.setBasemap("satellite");
  });
  $("#btnHybrid").on("click", function () {
    app.map.setBasemap("hybrid");
  });
  $("#btnTerrain").on("click", function () {
    app.map.setBasemap("terrain");
  });
  $("#btnGray").on("click", function () {
    app.map.setBasemap("gray");
  });
  $("#btnDark").on("click", function () {
    app.map.setBasemap("dark-gray");
  });
  $("#btnNatGeo").on("click", function () {
    app.map.setBasemap("national-geographic");
  });
  $("#btnOSM").on("click", function () {
    app.map.setBasemap("osm");
  });
  $("#btnTopo").on("click", function () {
    app.map.setBasemap("topo");
  });
}
