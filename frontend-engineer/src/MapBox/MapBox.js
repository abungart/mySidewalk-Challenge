import React, { Component } from "react";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import kcNeighborhoods from "../kc-neighborhoods.json";

console.log("Token:", process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

class MapBox extends Component {
  state = {
    viewport: {
      longitude: -94.5867347,
      latitude: 39.1047201,
      zoom: 12,
    },
  };

  render() {
    return (
      <div>
        <ReactMapboxGL
          style={{ width: "100%", height: "500px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          className="mapContainer"
          onViewportChange={(viewport) => this.setState({ viewport })}
          {...this.state.viewport}
        ></ReactMapboxGL>
      </div>
    );
  }
}

export default MapBox;
