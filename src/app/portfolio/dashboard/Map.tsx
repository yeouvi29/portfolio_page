"use client";

import { useRef } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  MapCameraChangedEvent,
  Pin,
} from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

import "./mapStyles.css";
import { ATTRACTIONS_LAT_LNG } from "@/constants";

const SF_POSITION = { lat: 37.7749, lng: -122.4194 };
interface Poi {
  name: string;
  location: google.maps.LatLngLiteral;
}

const PoiMarkers = ({ pois }: { pois: Poi[] }) => {
  return pois.map(({ name, location }) => (
    <AdvancedMarker key={name} position={location} title={name}>
      <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  ));
};

const Map = () => {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        style={{ width: "100%", height: "300px" }}
        defaultZoom={12}
        mapId={"Attractions in SF"}
        defaultCenter={SF_POSITION}
        onCameraChanged={(ev: MapCameraChangedEvent) =>
          console.log(
            "camera changed:",
            ev.detail.center,
            "zoom:",
            ev.detail.zoom
          )
        }
      >
        <PoiMarkers pois={ATTRACTIONS_LAT_LNG} />
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
