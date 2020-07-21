import React, { Component } from "react";
import ReactMapboxGL, { Source, Layer } from "@urbica/react-map-gl";
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
    return (
      <div>
        <ReactMapboxGL
          style={{ width: "100%", height: "500px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          className="mapContainer"
          onViewportChange={(viewport) => this.setState({ viewport })}
          {...this.state.viewport}
        >
          <Source id="kc-neighborhoods" type="geojson" data={kcNeighborhoods} />
          <Layer
            id="kc-neighborhoods"
            type="line"
            source="kc-neighborhoods"
            onHover={this.neighborhoodHover}
            paint={{
              "line-color": "#ff4f00",
              "line-width": 3,
              // "fill-opacity": 0.4,
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
              // "fill-opacity": 0.4,
            }}
          />
          <Source
            id="highlighted-neighborhood"
            type="geojson"
            data={this.state.neighborhoodHighlight}
          />
          <Layer
            id="highlighted-neighborhood"
            type="fill"
            source="highlighted-neighborhood"
            paint={{
              "fill-color": "#0000FF",
              "fill-opacity": 0.4,
            }}
          />
        </ReactMapboxGL>
      </div>
    );
  }
}

export default MapBox;
