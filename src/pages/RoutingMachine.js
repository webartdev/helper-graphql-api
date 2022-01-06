import { 
    // MapLayer,
    TileLayer,
     Leaflet } from "react-leaflet";
import React from 'react';
import L from "leaflet";
// import "leaflet-routing-machine";
// import "lrm-google";
// import { withLeaflet } from "react-leaflet";
//#endregion
// const HeatLayer = (props: Props) => {
//   const map = useMap();

//   React.useEffect(() => {
//     const { data, ...options } = props;

//     const heatLayer = Leaflet.heatLayer(data, options);
//     map.addLayer(heatLayer);
//     return () => {
//       map.removeLayer(heatLayer);
//     };
//   }, [map, props]);
// };


class Routing extends TileLayer {
  createLeafletElement() {
    const { map } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(16.506, 80.648),
        L.latLng(17.384, 78.4866),
        L.latLng(12.971, 77.5945)
      ],
      router: new L.Routing.Google(),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4
          }
        ]
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
// export default withLeaflet(Routing);
export default Routing;