import React, { Component } from "react";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import HighCharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
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
    neighborhoodHighlight: [],
    tractHighlight: [],
    status: "Map",
    tabValue: 0,
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

  //Set hover features
  tractHover = (event) => {
    console.log("Hovering over Tract:", event.features[0].properties);
    this.setState({ tractHighlight: event.features[0] });
  };

  neighborhoodHover = (event) => {
    console.log("Hovering over Neighborhood:", event.features[0].properties);
    this.setState({ neighborhoodHighlight: event.features[0] });
  };

  render() {
    const options = {
      chart: {
        type: "spline",
      },
      title: {
        text: "My chart",
      },
      series: [
        {
          data: [1, 2, 1, 4, 3, 6],
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

        {this.state.status === "Map" && (
          <ReactMapboxGL
            style={{ width: "100%", height: "500px" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            className="mapContainer"
            onViewportChange={(viewport) => this.setState({ viewport })}
            {...this.state.viewport}
          >
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
              paint={{
                "line-color": "#ff4f00",
                "line-width": 3,
              }}
            />
            <Source id="kc-tracts" type="geojson" data={kcTracts} />
            <Layer
              id="kc-tracts"
              type="line"
              source="kc-tracts"
              onHover={this.tractHover}
              paint={{
                "line-color": "#00bfff",
                "line-width": 3,
              }}
            />
          </ReactMapboxGL>
        )}
        {this.state.status === "Chart" && (
          <HighchartsReact highcharts={HighCharts} options={options} />
        )}
      </div>
    );
  }
}

export default MapBox;
