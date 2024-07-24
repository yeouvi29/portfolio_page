"use client";

import { Fragment, ReactNode, useEffect, useState } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

import "./mapStyles.css";
import { ATTRACTIONS_LAT_LNG } from "@/constants";
import Link from "next/link";
import MapPin from "@/app/components/ui/MapPin/MapPin";

const SF_POSITION = { lat: 37.7749, lng: -122.4194 };
interface Poi {
  name: string;
  location: google.maps.LatLngLiteral;
  website: string;
  background: string;
  icon: ReactNode;
}

const PoiMarker = ({ poi, isActive }: { poi: Poi; isActive: boolean }) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <Fragment>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={poi.location}
        title={poi.name}
      >
        <MapPin isActive={isActive} background={poi.background}>
          {poi.icon}
        </MapPin>
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          headerContent={
            <div className="text-[14px] font-semibold text-left">
              {poi.name}
            </div>
          }
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          <Link href={poi.website} target="_blank" className="text-sf-red">
            {poi.website}
          </Link>
        </InfoWindow>
      )}
    </Fragment>
  );
};

const Map = ({ selectedAttraction }: { selectedAttraction: string }) => {
  const [center, setCenter] = useState(SF_POSITION);

  useEffect(() => {
    if (!selectedAttraction) {
      return;
    }
    const selectedPoi = ATTRACTIONS_LAT_LNG.find(
      (poi) => poi.name === selectedAttraction
    );
    setCenter(selectedPoi?.location || SF_POSITION);
  }, [selectedAttraction]);

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        style={{ width: "100%", height: "380px", transition: "all 0.5s" }}
        defaultZoom={12}
        mapId={"Attractions in SF"}
        defaultCenter={SF_POSITION}
        center={center}
      >
        {ATTRACTIONS_LAT_LNG.map((poi) => {
          return (
            <PoiMarker
              key={poi.name}
              poi={poi}
              isActive={selectedAttraction === poi.name}
            />
          );
        })}
      </GoogleMap>
    </APIProvider>
  );
};

export default Map;
