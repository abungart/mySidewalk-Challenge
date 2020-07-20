import React from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJ1bmdhcnQiLCJhIjoiY2tjcGJnY2EzMDIybTMybzdqODk5eGthdSJ9.iexUW2PYDGJWvZOg5nqFIQ";

class MapBox extends React.Component {
  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
    });
  }

  state = {
    lng: 5,
    lat: 34,
    zoom: 2,
  };

  render() {
    return (
      <div>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </div>
    );
  }
}

export default MapBox;
