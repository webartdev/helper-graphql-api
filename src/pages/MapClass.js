import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import {MarkerClustergroup} from "react-leaflet-markercluster"
import { makeStyles } from "@material-ui/core/styles"

// import MapInfo from "./MapInfo";
// import Routing from "./RoutingMachine";

const useStyles = makeStyles(theme => ({
  paper: {
      width:400,
      height: 1000,
      backgroundColor: '#ffffff',
  },
  mapContainer: {
    width: "100%",
    height: "50vh"
  }
}))
// const classes = useStyles();
class MapComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 17.4,
      lng: 78.4,
      zoom: 1,
      isMapInit: false
    };
  }

  saveMap = map => {
    this.map = map;
    this.setState({
      isMapInit: true
    });
  };

  render() {
   
    const { lat, lng, zoom } = this.state;
    const position = [lat, lng];

    return (
      <MapContainer 
      // center={position} 
      // zoom={zoom} 
      // ref={this.saveMap}
center={[20, 0]}
zoom={2.4}
scrollWheelZoom={true}
minZoom={2.4}
// className={classes.mapContainer}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <MarkerClustergroup
        maxClusterRadius={50}
        iconCreateFunction={clustermarker} 
        /> */}
        {/* {this.state.isMapInit && <Routing map={this.map} />} */}
      </MapContainer>
    );
  }
}

export default MapComponent;
