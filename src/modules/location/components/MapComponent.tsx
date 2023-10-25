import React from 'react';
import Map from './Map';

const isBrowser = typeof window !== 'undefined';

type MapComponentProps = {
  // customStyle?: { featureType?: string, elementType?:string, stylers: [{ [key: string]: string | number }] }[];
  lat: number;
  lng: number;
  title: string;
  id?: string;
  zoomControl?: boolean;
};

const MapComponent: React.FC<MapComponentProps> = ({
  lat,
  lng,
  title,
  id,
  zoomControl,
  // customStyle
}) => {
  return (
    <Map
      id={id || 'myMap'}
      options={{
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        center: { lat, lng },
        zoom: 17,
        styles: [],
        zoomControl: typeof zoomControl === 'boolean' ? zoomControl : true,
      }}
      // customStyle={customStyle}
      height="100%"
      onMapLoad={(map: google.maps.Map | undefined) => {
        if (isBrowser) {
          const marker = new window.google.maps.Marker({
            position: { lat, lng },
            map,
            title,
          });
          return marker;
        }
        return null;
      }}
    />
  );
};

export default MapComponent;
