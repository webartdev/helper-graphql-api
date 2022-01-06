import React from 'react'
// import dynamic from "next/dynamic";
import MapComponent from "./Map";

export default function Maps() {
  // const MapWithNoSSR = dynamic(() => import("./Map"), {
  //   ssr: false
  // });
  return (
    <div id="map">
      <MapComponent />
      {/* <MapWithNoSSR /> */}
    </div>
  )
}
