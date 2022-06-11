import React, { useEffect } from "react"
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet'
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  paper: {
    width: 400,
    height: 1000,
    backgroundColor: '#ffffff',
  },
  mapContainer: {
    width: "100%",
    height: "50vh",
    top: 10,
    left: 2
  },
  markerClusterCustomSmall: {
    width: "20px !important",
    height: "20px !important",
    "& div": {
      width: "18px",
      height: "18px"
    }
  },
  markerClusterCustomLarge: {
    width: "35px !important",
    height: "35px !important",
    "& div": {
      width: "33px",
      height: "33px",
      borderRadius: "20px"
    }
  },
}))

export default function MapComponent() {
  const classes = useStyles();

  const lat = 40;
  const lng = 16;
  const zoom = 2.4;
  const position = [lat, lng];
  // const maxBounds = L.latLngBounds([
  //   [-90, 180],
  //   [90, -180]
  // ])



  return (
    <div>Maps</div>
    // <MapContainer
    //   center={[20, 0]}
    //   zoom={zoom}
    //   scrollWheelZoom={true}
    //   minZoom={2.4}
    //   className={classes.mapContainer}
    //   worldCopyJump={true}
    //   maxBounds={maxBounds}

    // >
    //   <TileLayer
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //   />
    //   <Marker position={position}>
    //     <Popup>
    //       Marker showing a random location.
    //   </Popup>
    //   </Marker>
    // </MapContainer>
  );
}

