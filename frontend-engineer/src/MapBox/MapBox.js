import React, { Component } from "react";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import "mapbox-gl/dist/mapbox-gl.css";
import kcNeighborhoods from "../kc-neighborhoods.json";
import kcTracts from "../kc-tracts.json";

class MapBox extends Component {
  state = {
    viewport: {
      longitude: -94.5867347,
      latitude: 39.1047201,
      zoom: 12,
    },
    status: "Map",
    tabValue: 0,
    viewType: "Neighborhood",
    commuteInfo: {
      location: "",
      alone: "",
      carpool: "",
      pubTrans: "",
      walking: "",
    },
  };

  //Set tabs
  selectMap = () => {
    this.setState({
      status: "Map",
    });
  };
  selectChart = () => {
    this.setState({
      status: "Chart",
    });
  };

  onChange = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  //Selector for Neighborhood or Tract Data
  showNeighborhood = () => {
    this.setState({ viewType: "Neighborhood" });
  };
  showTract = () => {
    this.setState({ viewType: "Tract" });
  };

  //Set hover features
  tractHover = (event) => {
    console.log("Hovering over Tract:", event.features[0].properties);
    this.setState({
      commuteInfo: {
        location: event.features[0].properties.shid,
        alone: event.features[0].properties["pop-commute-drive_alone"],
        carpool: event.features[0].properties["pop-commute-drive_carpool"],
        pubTrans: event.features[0].properties["pop-commute-public_transit"],
        walking: event.features[0].properties["pop-commute-walk"],
      },
    });
  };
  neighborhoodHover = (event) => {
    this.setState({
      commuteInfo: {
        location: event.features[0].properties.shid,
        alone: event.features[0].properties["pop-commute-drive_alone"],
        carpool: event.features[0].properties["pop-commute-drive_carpool"],
        pubTrans: event.features[0].properties["pop-commute-public_transit"],
        walking: event.features[0].properties["pop-commute-walk"],
      },
    });
  };

  render() {
    console.log("json:", kcNeighborhoods.features);

    let driveAlone = [];
    let driveCarpool = [];
    let publicTransit = [];
    let walk = [];
    let driveAloneTract = [];
    let driveCarpoolTract = [];
    let publicTransitTract = [];
    let walkTract = [];

    for (let i = 0; i < kcNeighborhoods.features.length; i++) {
      driveAlone.push([
        kcNeighborhoods.features[i].properties.shid,
        kcNeighborhoods.features[i].properties["pop-commute-drive_alone"],
      ]);
      driveCarpool.push([
        kcNeighborhoods.features[i].properties.shid,
        kcNeighborhoods.features[i].properties["pop-commute-drive_carpool"],
      ]);
      publicTransit.push([
        kcNeighborhoods.features[i].properties.shid,
        kcNeighborhoods.features[i].properties["pop-commute-public_transit"],
      ]);
      walk.push([
        kcNeighborhoods.features[i].properties.shid,
        kcNeighborhoods.features[i].properties["pop-commute-walk"],
      ]);
    }

    for (let i = 0; i < kcTracts.features.length; i++) {
      driveAloneTract.push([
        kcTracts.features[i].properties.shid,
        kcTracts.features[i].properties["pop-commute-drive_alone"],
      ]);
      driveCarpoolTract.push([
        kcTracts.features[i].properties.shid,
        kcTracts.features[i].properties["pop-commute-drive_carpool"],
      ]);
      publicTransitTract.push([
        kcTracts.features[i].properties.shid,
        kcTracts.features[i].properties["pop-commute-public_transit"],
      ]);
      walkTract.push([
        kcTracts.features[i].properties.shid,
        kcTracts.features[i].properties["pop-commute-walk"],
      ]);
    }

    const options = {
      chart: {
        type: "spline",
      },
      title: {
        text: "Neighborhood and Tract Commute Data",
      },
      xAxis: {
        title: {
          text: "Kansas City Neighborhoods & Tracts",
        },
      },
      yAxis: {
        title: {
          text: "Average Commuters",
        },
      },

      colors: [
        "#6CF",
        "#39F",
        "#06C",
        "#000",
        "#FA8072",
        "#FF0000",
        "#8B0000",
        "#FF4500",
      ],

      series: [
        {
          name: "Neighborhood Pop Drives Alone",
          data: driveAlone,
        },
        {
          name: "Neighborhood Pop Drives Carpool",
          data: driveCarpool,
        },
        {
          name: "Neighborhood Pop Riding Public Transit",
          data: publicTransit,
        },
        {
          name: "Neighborhood Pop Walks",
          data: walk,
        },
        {
          name: "Tract Pop Drives Alone",
          data: driveAloneTract,
        },
        {
          name: "Tract Pop Drives Carpool",
          data: driveCarpoolTract,
        },
        {
          name: "Tract Pop Riding Public Transit",
          data: publicTransitTract,
        },
        {
          name: "Tract Pop Walks",
          data: walkTract,
        },
      ],
    };
    return (
      <div>
        <div>
          <Box display="flex" justifyContent="center" m={1} p={1}>
            <Tabs
              value={this.state.tabValue}
              onChange={this.onChange}
              centered
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Map" onClick={this.selectMap} color="secondary"></Tab>
              <Tab
                label="Chart"
                onClick={this.selectChart}
                color="secondary"
              ></Tab>
            </Tabs>
          </Box>
        </div>

        {(this.state.status === "Map") &
          (this.state.viewType === "Neighborhood") && (
          <div>
            <ReactMapboxGL
              style={{ width: "100%", height: "500px" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              className="mapContainer"
              onViewportChange={(viewport) => this.setState({ viewport })}
              {...this.state.viewport}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={this.showNeighborhood}
              >
                Neighborhood
              </Button>
              <> </>
              <Button
                variant="contained"
                color="primary"
                onClick={this.showTract}
              >
                Tract
              </Button>
              <Source
                id="kc-neighborhoods"
                type="geojson"
                data={kcNeighborhoods}
              />
              <Layer
                id="kc-neighborhoods"
                type="line"
                source="kc-neighborhoods"
                onHover={this.neighborhoodHover}
                onClick={this.regionClick}
                paint={{
                  "line-color": "#00bfff",
                  "line-width": 3,
                }}
              />
            </ReactMapboxGL>
            {/* This should be a popup or type of modal */}
            <div id="mapData">
              <h3>Location: {this.state.commuteInfo.location}</h3>
              <h4>
                Drives Alone: {this.state.commuteInfo.alone} Drives In Carpool:
                {this.state.commuteInfo.carpool}
              </h4>
              <h4>
                Uses Public Transit: {this.state.commuteInfo.pubTrans} Walks:
                {this.state.commuteInfo.walking}
              </h4>
            </div>
          </div>
        )}
        {(this.state.status === "Map") & (this.state.viewType === "Tract") && (
          <div>
            <ReactMapboxGL
              style={{ width: "100%", height: "500px" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              className="mapContainer"
              onViewportChange={(viewport) => this.setState({ viewport })}
              {...this.state.viewport}
            >
              <Button
                variant="contained"
                color="Primary"
                onClick={this.showNeighborhood}
              >
                Neighborhood
              </Button>
              <> </>
              <Button
                variant="contained"
                color="Primary"
                onClick={this.showTract}
              >
                Tract
              </Button>
              <Source id="kc-tracts" type="geojson" data={kcTracts} />
              <Layer
                id="kc-tracts"
                type="line"
                source="kc-tracts"
                onHover={this.tractHover}
                onClick={this.regionClick}
                paint={{
                  "line-color": "#ff4f00",
                  "line-width": 3,
                }}
              />
            </ReactMapboxGL>
            {/* This should be a popup or type of modal */}
            <div id="mapData">
              <h3>Location: {this.state.commuteInfo.location}</h3>
              <h4>
                Drives Alone: {this.state.commuteInfo.alone} Drives In Carpool:
                {this.state.commuteInfo.carpool}
              </h4>
              <h4>
                Uses Public Transit: {this.state.commuteInfo.pubTrans} Walks:
                {this.state.commuteInfo.walking}
              </h4>
            </div>
          </div>
        )}
        {this.state.status === "Chart" && (
          <HighchartsReact highcharts={HighCharts} options={options} />
        )}
      </div>
    );
  }
}

export default MapBox;
